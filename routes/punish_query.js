var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const punish = require('./utility/punish');

//接收GET請求
router.get('/', function(req, res, next) {
    var email = req.session.email
    var no = email.indexOf("@",1);
    var userno = email.substr(0,no);

    punish.query(userno).then(data => {
        if (data==null){
            res.render('notFound');            
        }else if(data.length > 0){
            //console.log(data);
            res.render('punish_query', {items:data, moment:moment});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面     
        }  
    })
});

module.exports = router;