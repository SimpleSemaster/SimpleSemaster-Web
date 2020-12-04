var express = require('express');
var router = express.Router();

//增加引用函式
const deviceverify = require('./utility/deviceverify');

//接收POST請求
router.post('/', function(req, res, next) {
    var bookingdeviceno = req.body.bookingdeviceno;   //取得產品編號
    if(typeof(bookingdeviceno) === 'string'){
        bookingdeviceno = [bookingdeviceno];
    }
    var t = [req.body.return0, req.body.return1, req.body.return2, req.body.return3, req.body.return4, req.body.return5, req.body.return6, req.body.return7, req.body.return8, req.body.return9
        ,req.body.return10, req.body.return11, req.body.return12, req.body.return13, req.body.return14, req.body.return15, req.body.return16, req.body.return17, req.body.return18, req.body.return19
        ,req.body.return20, req.body.return21, req.body.return22, req.body.return23, req.body.return24, req.body.return25, req.body.return26, req.body.return27, req.body.return28, req.body.return29
        ,req.body.return30, req.body.return31, req.body.return32, req.body.return33, req.body.return34, req.body.return35, req.body.return36, req.body.return37, req.body.return38, req.body.return39
        ,req.body.return40, req.body.return41, req.body.return42, req.body.return43, req.body.return44, req.body.return45, req.body.return46, req.body.return47, req.body.return48, req.body.return49];
    var rt = [];

    for(var i=0;i<bookingdeviceno.length;i++){
        rt.push(t[i]);
    }

    var newData={
        bookingdeviceno:bookingdeviceno,                   
        return:rt
    } 

    deviceverify.update_return(newData).then(d => {
        if (d>=0){
            res.render('returnSuccess');
        }else{
            res.render('returnFail');
        }  
    })
});

//匯出
module.exports = router;