'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// 新增商品
//------------------------------------------
var add = async function(newData){
    var result={};

    await sql('INSERT INTO bookingdevice (userno, category, bookingdate, borrowdate, returndate, teleno) VALUES ($1, $2, $3, $4, $5, $6)', [newData.userno, newData.category, newData.bookingdate, newData.borrowdate, newData.returndate, newData.teleno])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
        
    return result;
}

var query = async function(bookingdate){
    var result={};
    
    await sql('SELECT * FROM "bookingdevice" WHERE "bookingdate" = $1', [bookingdate])
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
    var result={};

    await sql('INSERT INTO bookingdevice_detail (bookingdeviceno) VALUES ($1)', [newData.bookingdeviceno])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
        
    return result;
}

//------------------------------------------
// 查詢是否有違規
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

//匯出
module.exports = {add, query, add_detail, query_verify};