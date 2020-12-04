'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//新增
//------------------------------------------
var add = async function(newData){
    var result;
    await sql('INSERT INTO "user" ("userno", "username", "schemail", "isEmployee", "restrict") VALUES ($1, $2, $3, $4, $5)', [newData.userno, newData.username, newData.schemail, newData.isEmployee, newData.restrict])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//----------------------------------
// 刪除
//----------------------------------
var remove = async function(userno){
    var result;

    await sql('DELETE FROM "user" WHERE "userno" = $1', [userno])
        .then((data) => {
            result = data.rowCount;   //刪除筆數(包括刪除0筆) 
        }, (error) => {
            result = -1;   //剛除失敗
        });
		
    return result;
}

//------------------------------------------
//查詢
//------------------------------------------
var query = async function(userno){
    var result={};
    
    await sql('SELECT * FROM "user" WHERE "userno" = $1', [userno])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

//----------------------------------
// 更新商品
//----------------------------------
var update = async function(newData){
    var results;

    await sql('UPDATE "user" SET "username"=$1, "isEmployee"=$2, "restrict"=$3 WHERE "userno" = $4', [newData.username, newData.isEmployee, newData.restrict, newData.userno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

//------------------------------------------
//user_type(權限)
//------------------------------------------
var user_type = async function(schemail){
    var result={};
    
    await sql('SELECT * FROM "user" WHERE "schemail" = $1', [schemail])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

//匯出
module.exports = {add, remove, query, update, user_type};