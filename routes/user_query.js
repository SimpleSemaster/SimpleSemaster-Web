var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收GET請求
router.get('/', function(req, res, next) {
    var userno = req.query.userno;   //取出參數

    user.query(userno).then(data => {
        if (data==null || data==-1){
            res.render('notFound');          
        }else{
            res.render('user_query', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;