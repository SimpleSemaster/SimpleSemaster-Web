'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// 審核
//------------------------------------------
var query_verify = async function(userno){
    var result={};
    
    await sql('SELECT * FROM bookingdevice AS a JOIN bookingdevice_detail AS b on a.bookingdeviceno = b.bookingdeviceno WHERE a.userno = $1 and yesorno is NULL', [userno])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });     
        
    return result;
}

var update_verify_detail = async function(newData){
    var results=0;

    for(var i=0; i<newData.bookingdeviceno.length;i++){       
        await sql('UPDATE bookingdevice_detail SET deviceno=$1 WHERE bookingdeviceno = $2', [newData.deviceno[i], newData.bookingdeviceno[i]])
            .then((data) => {
                results = results + data.rowCount;  
            }, (error) => {
                results = -1;
            });
    }
    return results;
}

var update_verify = async function(newData){
    var results=0;

    for(var i=0; i<newData.bookingdeviceno.length;i++){
        await sql('UPDATE bookingdevice SET reviewdate=$1, yesorno=$2, return = $3 WHERE bookingdeviceno = $4', [newData.reviewdate[i], newData.yesorno[i], newData.return[i], newData.bookingdeviceno[i]])
            .then((data) => {
                results = results + data.rowCount;  
            }, (error) => {
                results = -1;
            });
    }

    return results;
}


//------------------------------------------
// 歸還
//------------------------------------------
var query_return = async function(userno){
    var result={};
    
    await sql('SELECT * FROM bookingdevice AS a JOIN bookingdevice_detail AS b on a.bookingdeviceno = b.bookingdeviceno WHERE a.userno = $1 and return is false', [userno])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });   

    return result;  
}

var update_return = async function(newData){
    var results = 0;

    for(var i=0; i<newData.bookingdeviceno.length;i++){
        await sql('UPDATE bookingdevice SET return=$1 WHERE bookingdeviceno = $2', [newData.return[i], newData.bookingdeviceno[i]])
            .then((data) => {
                results = data.rowCount;  
            }, (error) => {
                results = -1;
            });
    }

    return results;
}


//------------------------------------------
// 查詢
//------------------------------------------
var query_no = async function(userno){
    var result={};
    
    await sql('SELECT * FROM bookingdevice AS a JOIN bookingdevice_detail AS b on a.bookingdeviceno = b.bookingdeviceno WHERE a.userno = $1', [userno])
        .then((data) => {
            result = data.rows;   
        }, (error) => {
            result = null;
        });

    return result;  
}

//匯出
module.exports = {query_verify, update_verify, update_verify_detail, query_return, update_return, query_no};