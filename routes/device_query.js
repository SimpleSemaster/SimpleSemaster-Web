var express = require('express');
var router = express.Router();

//增加引用函式
const device = require('./utility/device');

//接收GET請求
router.get('/', function(req, res, next) {
    var deviceno = req.query.deviceno;   //取出參數

    device.query(deviceno).then(data => {
        if (data==null || data==-1){
            res.render('notFound');          
        }else{
            res.render('device_query', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;