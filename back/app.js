const express = require('express');
const cors = require('cors');
//const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');
const app = express();

dotenv.config();
//db 실행 부분
db.sequelize.sync( { } );

app.use(morgan('dev'));
app.use(cors({
    //origin: 'http://localhost:3080',
    //credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));



app.get('/', (req, res)=>{
    res.status(200).send('Hello World');
});


app.listen(3085, ()=>{
    console.log(`Backend Server is Listening on port ${3085}`);
});