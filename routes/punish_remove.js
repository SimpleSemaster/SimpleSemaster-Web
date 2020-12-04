var express = require('express');
var router = express.Router();

//增加引用函式
const punish = require('./utility/punish');

//接收POST請求
router.post('/', function(req, res, next) {
    var punishno = req.body.punishno;   //取得產品編號
   
    punish.remove(punishno).then(d => {
        if(d>=0){
            res.render('removeSuccess');  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;