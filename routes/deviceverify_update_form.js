var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const deviceverify = require('./utility/deviceverify');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.userno;

    deviceverify.query_verify(no).then(d => {
        if(d==null){
            res.render('notFound');  //導向錯誤頁面
        }else if(d.length > 0){
            res.render('deviceverify_update_form', {items:d, moment:moment});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;