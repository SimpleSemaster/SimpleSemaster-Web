var express = require('express');
var router = express.Router();

//增加引用函式
const device = require('./utility/device');

//接收POST請求
router.post('/', function(req, res, next) {
    var deviceno = req.body.deviceno;   //取得產品編號

    var newData={
        deviceno:deviceno,                   
        devicename: req.body.devicename,   
        devicedetail: req.body.devicedetail 
    } 
    
    device.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess');
        }else{
            res.render('updateFail');
        }  
    })
});

//匯出
module.exports = router;