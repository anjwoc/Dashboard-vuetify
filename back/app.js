const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv');
const request = require('request');
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

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:8080',
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

server.listen(3085, ()=>{
    console.log(`Backend Server is Listening on port ${3085}`);
});

io.sockets.on('connection', function(socket){
  socket.interval = setInterval(() => {
    try{
        let realtimeChartSeries = new Array();
        let realtimeChartLabels = new Array();
        //DB 연동해서 DB로부터 센서값 조회
        const con = mysql.createConnection({
            host: 'anjwoc.iptime.org',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'test'
        });
        con.connect();
        con.query("select CONCAT(HOUR(insertedAt), '시', MINUTE(insertedAt), '분') AS time, mA from sensor where insertedAt > DATE_SUB(now(), INTERVAL 8 MINUTE) LIMIT 8;",(err, rows, fields)=>{
            if(!err){
                console.log('The solution is: ', rows);
                for(let i=0;i<rows.length;i++){
                  realtimeChartLabels.push(rows[i]['time']);
                  realtimeChartSeries.push(rows[i]['mA']);
                }
                io.emit('realtimeChartLabels', realtimeChartLabels);
                io.emit('realtimeChartSeries', realtimeChartSeries);
            } 
            else
                console.log('Error while performing Query. ', err);
        });
        con.end();
        
    }catch(err){
        console.error(err);
        return next(err);
    };
  }, 60000);
  


});