var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

//增加引用函式
const roomverify = require('./utility/roomverify');

//接收POST請求
router.post('/', function(req, res, next) {
    var no = (req.body.userno).toLowerCase();
    console.log(no);

    var userno = (req.body.userno).toLowerCase();
    if(typeof(userno) === 'string'){
        userno = [userno];
    }
    var email = [];

    var bookingroomno = req.body.bookingroomno;   //取得借用編號
    if(typeof(bookingroomno) === 'string'){
        bookingroomno = [bookingroomno];
    }
    var yn = [req.body.yesorno0, req.body.yesorno1, req.body.yesorno2, req.body.yesorno3, req.body.yesorno4, req.body.yesorno5, req.body.yesorno6, req.body.yesorno7, req.body.yesorno8, req.body.yesorno9
    ,req.body.yesorno10, req.body.yesorno11, req.body.yesorno12, req.body.yesorno13, req.body.yesorno14, req.body.yesorno15, req.body.yesorno16, req.body.yesorno17, req.body.yesorno18, req.body.yesorno19
    ,req.body.yesorno20, req.body.yesorno21, req.body.yesorno22, req.body.yesorno23, req.body.yesorno24, req.body.yesorno25, req.body.yesorno26, req.body.yesorno27, req.body.yesorno28, req.body.yesorno29
    ,req.body.yesorno30, req.body.yesorno31, req.body.yesorno32, req.body.yesorno33, req.body.yesorno34, req.body.yesorno35, req.body.yesorno36, req.body.yesorno37, req.body.yesorno38, req.body.yesorno39
    ,req.body.yesorno40, req.body.yesorno41, req.body.yesorno42, req.body.yesorno43, req.body.yesorno44, req.body.yesorno45, req.body.yesorno46, req.body.yesorno47, req.body.yesorno48, req.body.yesorno49];
    var yesorno = [];

    for(var i=0;i<bookingroomno.length;i++){
        yesorno.push(yn[i]);
    }

    var newData={
        bookingroomno:bookingroomno,
        yesorno:yesorno
    };


    roomverify.update(newData).then(d => {
        if (d>=0){
            console.log("updateSuccess");
            for(var i=0;i<bookingroomno.length;i++){
                email.push(userno[i] + "@ntub.edu.tw");

            //宣告發信物件
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'simplesemaster@gmail.com',
                    pass: 'ntub109507'
                }
            });

            var options = {
                //寄件者
                from: 'simplesemaster@gmail.com',
                //收件者
                to: userno[i] + "@ntub.edu.tw", 
                //主旨
                subject: '審核結果', // Subject line
                //純文字
                text: '可以到借用紀錄查看審核結果了, https://simple-semaster.herokuapp.com/' // plaintext body
            };

            transporter.sendMail(options, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    res.render('updateSuccess');
                }
            });
        }
        }else{
            res.render('updateFail');
        }  
    })
});

//匯出
module.exports = router;
/*

*/