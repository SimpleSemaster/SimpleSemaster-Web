var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const roomverify = require('./utility/roomverify');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = null;

    roomverify.query(no).then(d => {
        if (d!=null || d!=-1){
            if(d == null){
                res.render('no_verify')  //沒有審核資歷
            }else if(d.length >= 0){
                res.render('roomverify_update_form', {items:d, moment:moment});  //將資料傳給更新頁面
            }
        }else{
            res.render('notFound')  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;