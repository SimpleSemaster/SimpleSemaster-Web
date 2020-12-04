var express = require('express');
var router = express.Router();

//增加引用函式
const room = require('./utility/room');

//接收GET請求
router.get('/', function(req, res, next) {
    var roomno = req.query.roomno;   //取出參數

    room.query(roomno).then(data => {
        if (data==null || data==-1){
            res.render('notFound');          
        }else{
            res.render('room_query', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;