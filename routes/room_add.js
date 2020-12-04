var express = require('express');
var router = express.Router();

//增加引用函式
const room = require('./utility/room');

//接收POST請求
router.post('/', function(req, res, next) {
    var roomno = req.body.roomno;               //編號
    var roomname = req.body.roomname;           //名稱
    var roomdetail = req.body.roomdetail;       //細項

    // 建立一個新資料物件
    var newData={
        roomno:roomno,
        roomname:roomname,
        roomdetail:roomdetail,
    } 
    
    room.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');
        }else{
            res.render('addFail');
        }  
    })
});

module.exports = router;