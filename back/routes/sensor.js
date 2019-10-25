const express = require('express');
const mysql = require('mysql');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

const sensorRouter = (function(io) {
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
            con.query("select CONCAT(HOUR(insertedAt), '시', MINUTE(insertedAt), '분') AS time, mA from sensor where insertedAt > DATE_SUB(now(), INTERVAL 8 MINUTE) LIMIT 8;",(err, rows, fields)=>{
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
        };
    });
    
    router.get('/24h', async (req, res, next)=>{
        try{
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
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'test'
            });
    
            con.connect();
            con.query("select mac, sum(mA) AS mA from sensor where insertedAt > DATE_ADD(NOW(), INTERVAL -24 HOUR) group by mac ORDER BY mac ASC;", (err, rows, fields)=>{
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
    
    router.get('/acc_1m', async (req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'test'
            });
    
            con.connect();
            const query = `
            SELECT CASE WHEN DAYOFWEEK(insertedAt) = 1 THEN '일'
                WHEN DAYOFWEEK(insertedAt) = 2 THEN '월'
                WHEN DAYOFWEEK(insertedAt) = 3 THEN '화'
                WHEN DAYOFWEEK(insertedAt) = 4 THEN '수'
                WHEN DAYOFWEEK(insertedAt) = 5 THEN '목'
                WHEN DAYOFWEEK(insertedAt) = 6 THEN '금'
                WHEN DAYOFWEEK(insertedAt) = 7 THEN '토'
            ELSE '오류' END day
            ,SUM(mA) AS 합계 from sensor
            WHERE MONTH(sensor.insertedAt) = MONTH(NOW())
            group by DAYOFWEEK(insertedAt) -- 요일별 그룹
            ORDER BY (
                CASE DAYOFWEEK(insertedAt)
                WHEN 1 THEN 7 ELSE DAYOFWEEK(insertedAt)
                END
            );`;
            con.query(query, (err, rows, fields)=>{
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
    return router;
});




module.exports = sensorRouter;