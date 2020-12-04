'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// 新增商品
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO room (roomno, roomname, roomdetail) VALUES ($1, $2, $3)', [newData.roomno, newData.roomname, newData.roomdetail])
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
var remove = async function(roomno){
    var result;

    await sql('DELETE FROM room WHERE roomno = $1', [roomno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var query = async function(roomno){
    var result={};
    
    await sql('SELECT * FROM room WHERE roomno = $1', [roomno])
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

    await sql('UPDATE room SET roomname=$1, roomdetail=$2 WHERE roomno = $3', [newData.roomname, newData.roomdetail, newData.roomno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}



//匯出
module.exports = {add, remove, query, update};