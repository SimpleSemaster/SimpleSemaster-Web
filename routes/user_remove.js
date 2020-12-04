var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var userno = req.body.userno;   //取得編號
   
    user.remove(userno).then(d => {
        if(d>0){  
            res.render('removeSuccess');
        }else{
            res.render('removeFail');
        }
    })    
});

module.exports = router;