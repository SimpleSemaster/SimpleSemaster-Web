var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var userno = req.body.userno;   //取得編號

    var newData={
        userno:userno,                   
        username: req.body.username,   
        isEmployee: req.body.isEmployee,
        restrict: req.body.restrict  
    } 
    
    user.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess');
        }else{
            res.render('updateFail');
        }  
    })
});

//匯出
module.exports = router;