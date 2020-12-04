'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// 新增商品
//------------------------------------------
var add = async function(newData){
    var result={};
    console.log(newData);
    await sql('INSERT INTO bookingroom (userno, reason, bookingdate, borrowdate, endtime, evidence, role, borrowtime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newData.userno, newData.reason, newData.bookingdate, newData.borrowdate, newData.endtime, newData.evidence, newData.role, newData.borrowtime])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
    console.log(result);
    return result;
}

var query = async function(bookingdate){
    var result={};
    
    await sql('SELECT * FROM "bookingroom" WHERE "bookingdate" = $1', [bookingdate])
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

var add_detail = async function(newData){
    var result;

    await sql('INSERT INTO bookingroom_detail (bookingroomno, roomno) VALUES ($1, $2)', [newData.bookingroomno, newData.roomno])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
// 查詢是否有違規以及是否已經借用
//------------------------------------------
var query_verify = async function(userno){
    var result={};
    
    await sql('SELECT * FROM "bookingpunish" WHERE "userno" = $1', [userno])
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

var query_borrowdate = async function(borrowdate, borrowtime, endtime, roomno, yesorno){
    var result={};
    
    await sql('SELECT * FROM bookingroom as a JOIN bookingroom_detail as b on a.bookingroomno = b.bookingroomno WHERE a.borrowdate = $1 and a.borrowtime = $2 and a.endtime = $3 and b.roomno = $4 and a.yesorno = $5'
    , [borrowdate, borrowtime, endtime, roomno, yesorno])
        .then((data) => {
            result = data.rows; 
        }, (error) => {
            result = null;
        });
    
	console.log(result);	
    return result;
}



//匯出
module.exports = {add , query, add_detail, query_verify, query_borrowdate};