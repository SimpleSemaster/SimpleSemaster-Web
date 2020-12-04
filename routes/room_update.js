var express = require('express');
var router = express.Router();

//增加引用函式
const room = require('./utility/room');

//接收POST請求
router.post('/', function(req, res, next) {
    var roomno = req.body.roomno;   //取得產品編號

    var newData={
        roomno:roomno,                   
        roomname: req.body.roomname,   
        roomdetail: req.body.roomdetail 
    } 
    
    room.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess');
        }else{
            res.render('updateFail');
        }  
    })
});

//匯出
module.exports = router;