'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//審核
//------------------------------------------
var query = async function(yesorno){
    var result={};

    await sql('SELECT * FROM bookingroom as a JOIN bookingroom_detail as b on a.bookingroomno = b.bookingroomno WHERE yesorno is null or a.yesorno = $1 ORDER BY a.bookingroomno, a."role"', [yesorno])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });       
    
    return result;
}

var update = async function(newData){
    var results=0;

    for(var i=0; i<newData.bookingroomno.length;i++){
        await sql('UPDATE bookingroom SET yesorno=$1 WHERE bookingroomno=$2', [newData.yesorno[i], newData.bookingroomno[i]])
        .then((data) => {
            results = results + data.rowCount;  
        }, (error) => {
            results = -1;
        });
    }

    return results;
}

//------------------------------------------
//查詢
//------------------------------------------
var query_no = async function(userno){
    var result={};
    
    await sql('SELECT * FROM (bookingroom as a JOIN bookingroom_detail as b on a.bookingroomno = b.bookingroomno) JOIN room as c on b.roomno = c.roomno WHERE a.userno = $1', [userno])
        .then((data) => {
            result = data.rows;   
        }, (error) => {
            result = null;
        });

    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var query_date = async function(borrowdate){
    var result={};
    
    await sql('SELECT * FROM (bookingroom as a JOIN bookingroom_detail as b on a.bookingroomno = b.bookingroomno) JOIN room as c on b.roomno = c.roomno WHERE a.borrowdate = $1 and a.yesorno = true', [borrowdate])
        .then((data) => {
            result = data.rows;   
        }, (error) => {
            result = null;
        });
		
    return result;
}
//匯出
module.exports = {query, update, query_no, query_date};