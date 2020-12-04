'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO bookingpunish (userno, startdate, finishdate, punishdetail) VALUES ($1, $2, $3, $4)', [newData.userno, newData.startdate, newData.finishdate, newData.punishdetail])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//----------------------------------
// 刪除商品
//----------------------------------
var remove = async function(punishno){
    var result;

    await sql('DELETE FROM bookingpunish WHERE punishno = $1', [punishno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//查詢
//------------------------------------------
var query = async function(userno){
    var result={};
    
    await sql('SELECT * FROM bookingpunish WHERE userno = $1', [userno])
        .then((data) => {
            result = data.rows;       
        }, (error) => {
            result = null;
        });

    return result;
}

//----------------------------------
// 更新商品
//----------------------------------
var query_update = async function(userno){
    var result={};
    
    await sql('SELECT * FROM bookingpunish WHERE userno = $1', [userno])
        .then((data) => {
            result = data.rows;       
        }, (error) => {
            result = null;
        });
		
    return result;
}

var update = async function(newData){
    var results=0;

    for(var i=0; i<newData.punishno.length;i++){
        await sql('UPDATE bookingpunish SET userno = $1, startdate=$2, finishdate=$3, punishdetail=$4 WHERE punishno=$5', [newData.userno[i], newData.startdate[i], newData.finishdate[i], newData.punishdetail[i], newData.punishno[i]])
            .then((data) => {
                results = results + data.rowCount;  
            }, (error) => {
                results = -1;
            });
    }
    return results;
}

//匯出
module.exports = {add, remove, query, query_update, update};
