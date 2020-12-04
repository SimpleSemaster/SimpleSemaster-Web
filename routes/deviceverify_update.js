var express = require('express');
var router = express.Router();

//增加引用函式
const deviceverify = require('./utility/deviceverify');
var today = require('silly-datetime');

//接收POST請求
router.post('/', function(req, res, next) {
    var bookingdeviceno = req.body.bookingdeviceno;   //取得產品編號
    if(typeof(bookingdeviceno) === 'string'){
        bookingdeviceno = [bookingdeviceno];
    }
    var yn = [req.body.yesorno0, req.body.yesorno1, req.body.yesorno2, req.body.yesorno3, req.body.yesorno4, req.body.yesorno5, req.body.yesorno6, req.body.yesorno7, req.body.yesorno8, req.body.yesorno9
        ,req.body.yesorno10, req.body.yesorno11, req.body.yesorno12, req.body.yesorno13, req.body.yesorno14, req.body.yesorno15, req.body.yesorno16, req.body.yesorno17, req.body.yesorno18, req.body.yesorno19
        ,req.body.yesorno20, req.body.yesorno21, req.body.yesorno22, req.body.yesorno23, req.body.yesorno24, req.body.yesorno25, req.body.yesorno26, req.body.yesorno27, req.body.yesorno28, req.body.yesorno29
        ,req.body.yesorno30, req.body.yesorno31, req.body.yesorno32, req.body.yesorno33, req.body.yesorno34, req.body.yesorno35, req.body.yesorno36, req.body.yesorno37, req.body.yesorno38, req.body.yesorno39
        ,req.body.yesorno40, req.body.yesorno41, req.body.yesorno42, req.body.yesorno43, req.body.yesorno44, req.body.yesorno45, req.body.yesorno46, req.body.yesorno47, req.body.yesorno48, req.body.yesorno49];
    var yesorno = [];
    var reviewdate = []
    var rt = [];

    for(var i=0;i<bookingdeviceno.length;i++){
        yesorno.push(yn[i]);
    }

    for(var i=0; i<bookingdeviceno.length; i++){
        reviewdate.push(today.format("YYYY-MM-DD HH:MM:SS"));
        rt.push('f');
    }

    var newData={
        bookingdeviceno:bookingdeviceno,                 
        deviceno: req.body.deviceno,     
        yesorno: yesorno,
        reviewdate:reviewdate,
        return:rt
    } 

    deviceverify.update_verify_detail(newData).then(d => {
        console.log(newData)
        if (d>=0){
            deviceverify.update_verify(newData).then(d => {
                if (d>=0){
                    res.render('borrowSuccess');  //傳至成功頁面
                }else{
                    res.render('borrowFail');     //導向錯誤頁面
                }  
            })
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;