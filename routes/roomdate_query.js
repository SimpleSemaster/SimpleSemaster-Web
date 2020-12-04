var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const roomverify = require('./utility/roomverify');

//接收GET請求
router.get('/', function(req, res, next) {
    var borrowdate = req.query.borrowdate;   //取出參數

    roomverify.query_date(borrowdate).then(data => {
        if (data==null){
            res.render('notBorrow');  //導向錯誤頁面            
        }else if(data.length > 0){
            res.render('roomdate_query', {items:data, moment:moment});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面   
        } 
    })
});

module.exports = router;