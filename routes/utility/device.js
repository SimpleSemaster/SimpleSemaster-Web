'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// 新增商品
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO device (deviceno, devicename, devicedetail) VALUES ($1, $2, $3)', [newData.deviceno, newData.devicename, newData.devicedetail])
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
var remove = async function(deviceno){
    var result;

    await sql('DELETE FROM device WHERE deviceno = $1', [deviceno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//查詢商品
//------------------------------------------
var query = async function(deviceno){
    var result={};
    
    await sql('SELECT * FROM device WHERE deviceno = $1', [deviceno])
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

    await sql('UPDATE device SET devicename=$1, devicedetail=$2 WHERE deviceno = $3', [newData.devicename, newData.devicedetail, newData.deviceno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

//匯出
module.exports = {add, remove, query, update};