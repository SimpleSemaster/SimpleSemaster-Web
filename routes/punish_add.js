var express = require('express');
var router = express.Router();

//增加引用函式
const punish = require('./utility/punish');

//接收POST請求
router.post('/', function(req, res, next) {                 
    var userno = req.body.userno;                 
    var startdate = req.body.startdate;  
    var finishdate = req.body.finishdate;                  
    var punishdetail = req.body.punishdetail;  

    // 建立一個新資料物件
    var newData={
        userno:userno,
        startdate:startdate,
        finishdate:finishdate,
        punishdetail:punishdetail
    } 
    
    punish.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;