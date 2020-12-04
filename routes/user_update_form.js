var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const user = require('./utility/user');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.userno;

    user.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                userno: d.userno,
                usrname: d.usrname,
                isEmployee: d.isEmployee,
                restrict: d.restrict
            }
            res.render('user_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound')  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;