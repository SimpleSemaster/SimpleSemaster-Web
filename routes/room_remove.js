var express = require('express');
var router = express.Router();

//增加引用函式
const room = require('./utility/room');

//接收POST請求
router.post('/', function(req, res, next) {
    var roomrno = req.body.roomrno;   //取得編號
   
    room.remove(roomrno).then(d => {
        if(d>0){  
            res.render('removeSuccess');
        }else{
            res.render('removeFail');
        }
    })    
});

module.exports = router;