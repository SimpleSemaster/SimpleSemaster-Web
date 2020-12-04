var express = require('express');
var router = express.Router();

//增加引用函式
const room = require('./utility/room');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.roomno;

    room.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                roomno: d.roomno,
                roomname: d.roomname,
                roomdetail: d.roomdetail
            }

            res.render('room_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render("notFound")  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;