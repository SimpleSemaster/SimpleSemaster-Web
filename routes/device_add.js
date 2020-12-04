var express = require('express');
var router = express.Router();

//增加引用函式
const device = require('./utility/device');

//接收POST請求
router.post('/', function(req, res, next) {
    var deviceno = req.body.deviceno;               //編號
    var devicename = req.body.devicename;           //名稱
    var devicedetail = req.body.devicedetail;       //細項

    // 建立一個新資料物件
    var newData={
        deviceno:deviceno,
        devicename:devicename,
        devicedetail:devicedetail,
    } 
    
    device.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');
        }else{
            res.render('addFail');
        }  
    })
});

module.exports = router;