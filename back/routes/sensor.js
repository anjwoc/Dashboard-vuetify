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
                database: 'dashboard'
            });
            con.connect();
            const query = `select CONCAT(HOUR(insertedAt), '시', MINUTE(insertedAt), '분') AS time, W from sensor 
            where insertedAt > DATE_SUB(now(), INTERVAL 8 MINUTE)
            LIMIT 8;`

            con.query(query,(err, rows, fields)=>{
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
    
    router.get('/24h/:nodeId', async (req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            con.connect();
            const nodeId = req.params.nodeId;
            const query = `select * from sensor 
            where insertedAt > DATE_SUB(now(), INTERVAL -24 HOUR) AND NO=${nodeId}
            Limit 10;`
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
    router.get('/sum_24h/:nodeId', async (req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            const nodeId = req.params.nodeId;
            const query = `select mac, sum(W) AS W from sensor 
            where insertedAt > DATE_ADD(NOW(), INTERVAL -24 HOUR) AND NO=${nodeId} 
            group by mac 
            ORDER BY mac ASC;`
            con.connect();
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
    
    router.get('/acc_1m/:nodeId', async (req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            con.connect();
            const nodeId = req.params.nodeId;
            const query = `
            SELECT CASE WHEN DAYOFWEEK(insertedAt) = 1 THEN '일'
                WHEN DAYOFWEEK(insertedAt) = 2 THEN '월'
                WHEN DAYOFWEEK(insertedAt) = 3 THEN '화'
                WHEN DAYOFWEEK(insertedAt) = 4 THEN '수'
                WHEN DAYOFWEEK(insertedAt) = 5 THEN '목'
                WHEN DAYOFWEEK(insertedAt) = 6 THEN '금'
                WHEN DAYOFWEEK(insertedAt) = 7 THEN '토'
            ELSE '오류' END day
            ,SUM(W)/COUNT(W) AS 합계 from sensor
            WHERE MONTH(sensor.insertedAt) = MONTH(NOW()) AND NO=${nodeId}
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
    
    router.post('/config', async(req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            const onoff = req.body.onoff;
            const nodeId = req.body.nodeId;
            console.log(onoff);
            const sql = `UPDATE router SET onoff=? WHERE NO=${nodeId};`;
            console.log(sql);
            con.query(sql,[onoff],function(err,rows){
                if(err) console.log("err : "+err);
                console.log(rows);
                res.json(rows);
            });

        }catch(err){
            console.error(err);
            return next(err);
        }
    });


    router.get('/nodeStat', async (req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            const query = `SELECT DISTINCT(mac) FROM sensor;`;
            con.query(query, (err, rows, fields)=>{
                if(!err){
                    console.log('The solution is: ', rows);
                    res.json(rows);
                }else{
                    console.log('Error while performing Query. ', err);
                }
            })
        }catch(err){
            console.error(err);
            return next(err);
        }
    });

    router.get('/recent_20/:nodeId', async (req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            const nodeId = req.params.nodeId;
            const query = `SELECT * FROM sensor 
            WHERE NO=${nodeId}
            ORDER BY insertedAt DESC
            LIMIT 10;`;
            con.query(query, (err, rows, fields)=>{
                if(!err){
                    console.log('The solution is: ', rows);
                    res.json(rows);
                }else{
                    console.log('Error while performing Query. ', err);
                }
            })
        }catch(err){
            console.error(err);
            return next(err);
        }
    });

    router.get('/Avg_Months/:nodeId', async(req, res, next)=>{
        try{
            const con = mysql.createConnection({
                host: 'anjwoc.iptime.org',
                port: 3306,
                user: 'root',
                password: '1234',
                database: 'dashboard'
            });
            con.connect();
            const nodeId = req.params.nodeId;
            const query = `SELECT A.dt, A.total_usage/1000 AS kw FROM (
                      SELECT insertedAt, CONCAT(YEAR(insertedAt), '-', MONTH(insertedAt)) AS dt, SUM(w) AS total_usage FROM sensor
                      WHERE NO=${nodeId}
                      GROUP BY MONTH(insertedAt)
                      HAVING YEAR(insertedAt) = YEAR(DATE(NOW()))
                )A`;

            con.query(query, (err, rows, fields)=>{
                if(!err){
                    console.log('The solution is: ', rows);
                    res.json(rows);
                }
                else
                    console.log('Error while performing Query. ', err);
            })
            
        }catch(err){
            console.error(err);
            return next(err);
        }
    });
   
   
    return router;
});




module.exports = sensorRouter;