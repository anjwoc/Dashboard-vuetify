const express = require('express');
const mysql = require('mysql');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();


router.get('/', async (req, res, next)=>{
    try{
        let arr = new Array();

        //DB 연동해서 DB로부터 센서값 조회
        const con = mysql.createConnection({
            host: 'anjwoc.iptime.org',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'test'
        });

        con.connect();
        con.query("select * from sensor ORDER BY insertedAt DESC LIMIT 1;",(err, rows, fields)=>{
            if(!err){
                console.log('The solution is: ', rows);
                res.send(rows);
            }
            else
                console.log('Error while performing Query. ', err);
        });
        con.end();
        
    }catch(err){
        console.error(err);
        return next(err);
    };
});

router.get('/24h', async (req, res, next)=>{
    try{
        let arr = new Array();
        const con = mysql.createConnection({
            host: 'anjwoc.iptime.org',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'test'
        });

        con.connect();
        con.query("select * from sensor where insertedAt > DATE_ADD(now(), INTERVAL -24 HOUR) Limit 10;", (err, rows, fields)=>{
            if(!err){
                console.log('The solution is: ', rows);
                res.json(rows);
            }
            else
                console.log('Error while performing Query. ', err);
        });
        con.end();
    }catch(err){
        console.error(err);
        return next(err);
    }
});
router.get('/sum_24h', async (req, res, next)=>{
    try{
        let arr = new Array();
        const con = mysql.createConnection({
            host: 'anjwoc.iptime.org',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'test'
        });

        con.connect();
        con.query("select mac, sum(mA) AS mA from sensor where insertedAt > DATE_ADD(now(), INTERVAL -24 HOUR) group by mac;", (err, rows, fields)=>{
            if(!err){
                console.log('The solution is: ', rows);
                res.json(rows);
            }
            else
                console.log('Error while performing Query. ', err);
        });
        con.end();
    }catch(err){
        console.error(err);
        return next(err);
    }
});


const dbRead = () => {
    try{
        let arr = new Array();

        //DB 연동해서 DB로부터 센서값 조회
        var con = mysql.createConnection({
            host: 'anjwoc.iptime.org',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'test'
        });

        con.connect();
        con.query("select * from sensor where > DATE_ADD(now(), INTERVAL -13 HOUR);"),(err, rows, fields)=>{
            if(!err){
                console.log('The solution is: ', rows);
                arr.push(rows);
            }
            else
                console.log('Error while performing Query. ', err);
        };

        con.end();
    }catch(err){
        console.log("DB Error");
        console.error(err);
    }
};

const getEletricFee = (total) => {
    //전기요금 계산 공식
    fee = 0
    if(total <= 200){
      fee = total*93.3;
    }
    else if(total>200 && total<=400){
      first = 200*93.3;
      second = (total-200)*187.9;
      fee = first + second;
    }
    else{
      first = 200*93.3;
      second = 200*187.9;
      third = (total-400)*280.6;
      fee = first + second + third;
    }
    return fee;
}



module.exports = router;