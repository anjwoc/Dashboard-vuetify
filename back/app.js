const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');
const prod = process.env.NODE_ENV === 'production';
const db = require('./models');
const passportConfig = require('./passport');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userRouter = require('./routes/user');
const sensorRouter = require('./routes/sensor')(io);

dotenv.config();
//db 실행 부분
db.sequelize.sync( {  } );
passportConfig();

app.use(helmet());
app.use(hpp());
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://delog.net',
  //origin: 'http://15.164.132.151',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.status(200).send('Hello World');
});

app.use('/user', userRouter);
app.use('/sensor', sensorRouter);

server.listen(prod ? process.env.PORT : 3085, ()=>{
    console.log(`Backend Server is Listening on port ${prod ? process.env.PORT : 3085}`);
});

const getEletricFee = (total) => {
  //전기요금 계산 공식
  let fee = 0;
  let cnt = parseInt(total/200);
  if(cnt == 0){
    fee = (total-200)*93.3 + 910;
  }
  else if(cnt >= 1){
    fee = 200*93.3 + ((total-200)*187.9) + 1600;
  }else{
    fee = (200*187.9) + (200*93.3) + ((total-200)*280.6) + 7300;
  }
  //부가 가치세 & 전력 기금
  fee = fee + (fee*0.1) + (fee*0.037);
  fee -= fee%10; // 10원 미만 절사
  //TV보유시 청구 요금 2500원 추가
  fee/=1000;
  return fee;
};



let intervalArr = [];
io.sockets.on('connection', (socket)=>{
  let nodeId, socketId;

  socket.on('disconnect', ()=>{
    for(let i=0;i<intervalArr.length;i++){
      if(intervalArr[i].socketId === socket.id);
      clearInterval(intervalArr[i].intervalObj); 
    }
  });

  socket.on('nodeId', (data)=>{
    console.log("nodeid----------------");
      console.log(nodeId);
    nodeId = data;
    socketId = socket.id;

    let isFirst = true;
    for(let i=0;i<intervalArr.length;i++){
      if(intervalArr[i].socketId === socketId){
        isFirst = false;
        break;
      }
    }

    if(isFirst){
      console.log("nodeid----------------");
      console.log(nodeId);
      const interval = setInterval(()=>{
        try{
          
          let realtimeChartSeries = new Array();
          let realtimeChartLabels = new Array();
          let electricFee = 0;
          let totalUsage = 0;
          const sql = `select CONCAT(HOUR(insertedAt), ':', MINUTE(insertedAt), ':', SECOND(insertedAt)) AS time, W from sensor where insertedAt > DATE_SUB(now(), INTERVAL 1 MONTH) AND NO=${nodeId} LIMIT 8; `
                +`select (SUM(W)/COUNT(W))*720 AS W from sensor where insertedAt > DATE_SUB(now(), INTERVAL 1 MONTH) AND NO=${nodeId};`
                +`select SUM(W) AS W from sensor where insertedAt > DATE_SUB(now(), INTERVAL 1 DAY) AND NO=${nodeId};`;
          //DB 연동해서 DB로부터 센서값 조회
          const con = mysql.createConnection({
              host: process.env.DB_HOST,
              port: process.env.DB_PORT,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              multipleStatements: true,
          });
          con.connect();
          con.query(sql,(err, rows, fields)=>{
              if(!err){
                  const realtime = rows[0]; // 
                  electricFee = getEletricFee(rows[1][0]['W']);
                  totalUsage = parseInt(rows[2][0]['W']);
                  // console.log("------------nodeID----------");
                  // console.log(nodeId);
                  // console.log("------------realtimee----------");
                  // console.log(realtime);
                  // console.log("------------electricFee----------");
                  // console.log(electricFee);
                  // console.log("------------totalUsage----------");
                  // console.log(totalUsage);
                  for(let i=0;i<rows[0].length;i++){
                    let { time, W } = realtime[i];
                    realtimeChartLabels.push(time);
                    realtimeChartSeries.push(W);
                  }
                  io.emit('realtimeChartLabels', realtimeChartLabels);
                  io.emit('realtimeChartSeries', realtimeChartSeries);
                  io.emit('electricFee', electricFee);
                  io.emit('totalUsage', totalUsage);
              } 
              else
                  console.log('Error while performing Query. ', err);
          });
          con.end();
        }catch(err){
            console.error(err);
            return next(err);
        };
      },5000);

      intervalArr.push({'nodeId': nodeId, 'socketId': socketId, 'intervalObj': interval});
    }else{
      let idx;
      for(let i=0;i<intervalArr.length;i++){
        if(intervalArr[i].socketId === socketId){
          idx = i;
        }
      }
      clearInterval(intervalArr[idx].intervalObj);
      const interval = setInterval(()=>{
        try{
          
          let realtimeChartSeries = new Array();
          let realtimeChartLabels = new Array();
          let electricFee = 0;
          let totalUsage = 0;
          const sql = `select CONCAT(HOUR(insertedAt), ':', MINUTE(insertedAt), ':', SECOND(insertedAt)) AS time, W from sensor where insertedAt > DATE_SUB(now(), INTERVAL 1 MONTH) AND NO=${nodeId} LIMIT 8; `
                +`select SUM(W)/COUNT(W) AS W from sensor where insertedAt > DATE_SUB(now(), INTERVAL 1 MONTH) AND NO=${nodeId};`
                +`select SUM(W) AS W from sensor where insertedAt > DATE_SUB(now(), INTERVAL 1 DAY) AND NO=${nodeId};`;
          //DB 연동해서 DB로부터 센서값 조회
          const con = mysql.createConnection({
              host: process.env.DB_HOST,
              port: process.env.DB_PORT,
              user: process.env.DB_NAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              multipleStatements: true,
          });
          con.connect();
          con.query(sql,(err, rows, fields)=>{
              if(!err){
                  const realtime = rows[0]; // 
                  electricFee = getEletricFee(rows[1][0]['W']);
                  totalUsage = rows[2][0]['W'];
                  // console.log("------------nodeID----------");
                  // console.log(nodeId);
                  // console.log("------------realtimee----------");
                  // console.log(realtime);
                  // console.log("------------electricFee----------");
                  // console.log(electricFee);
                  // console.log("------------totalUsage----------");
                  // console.log(totalUsage);
                  for(let i=0;i<rows[0].length;i++){
                    let { time, W } = realtime[i];
                    realtimeChartLabels.push(time);
                    realtimeChartSeries.push(W);
                  }
                  io.emit('realtimeChartLabels', realtimeChartLabels);
                  io.emit('realtimeChartSeries', realtimeChartSeries);
                  io.emit('electricFee', electricFee);
                  io.emit('totalUsage', totalUsage);
              } 
              // else
              //     console.log('Error while performing Query. ', err);
          });
          con.end();
        }catch(err){
            console.error(err);
            return next(err);
        };
      },5000);
      intervalArr[idx] = {'nodeId': nodeId, 'socketId': socketId, 'intervalObj': interval};
    }
  });



});
