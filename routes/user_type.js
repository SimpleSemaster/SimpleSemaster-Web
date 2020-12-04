var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

router.get('/', function(req, res, next) {
    var schemail = req.session.email;  
    console.log("schemail：", schemail);

    user.user_type(schemail).then(d => {
        if (d==null || d == -1){
            res.render('loginFail'); //非本系師生
        }else{
            req.session.user_type = d;
            res.render('loginSuccess');     //登入成功
        }  
    })
});

module.exports = router;