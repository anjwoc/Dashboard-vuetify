const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const sensorRouter = require('./routes/sensor');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


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

io.on('connection', (socket)=>{
  console.log('user connected');

});

server.listen(3085, ()=>{
    console.log(`Backend Server is Listening on port ${3085}`);
});