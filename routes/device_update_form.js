var express = require('express');
var router = express.Router();

//增加引用函式
const device = require('./utility/device');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.deviceno;

    device.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                deviceno: d.deviceno,
                devicename: d.devicename,
                devicedetail: d.devicedetail
            }

            res.render('device_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render("notFound")  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;