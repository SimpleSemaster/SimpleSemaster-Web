var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const punish = require('./utility/punish');

//接收POST請求
router.post('/', function(req, res, next) {
    var punishno = req.body.punishno;   //取得產品編號
    var userno = req.body.userno;
    if(typeof(punishno) === 'string'){
        punishno = [punishno];
    }
    if(typeof(userno) === 'string'){
        userno = [userno];
    }

    var newData={
        punishno: punishno,
        userno: userno,                     
        startdate: req.body.startdate, 
        finishdate: req.body.finishdate,  
        punishdetail: req.body.punishdetail  
    } 
    
    punish.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess');  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;