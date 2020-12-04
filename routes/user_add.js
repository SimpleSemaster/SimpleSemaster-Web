var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var userno = req.body.userno;                 //學號
    var username = req.body.username;             //姓名
    var schemail = req.body.schemail;           //信箱
    var isEmployee = req.body.isEmployee;       //是否為員工
    var restrict = req.body.restrict;           //限制

    // 建立一個新資料物件
    var newData={
        userno:userno,
        username:username,
        schemail:schemail,
        isEmployee:isEmployee,
        restrict:restrict
    } 
    
    user.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');
        }else{
            res.render('addFail');
        }  
    })
});

module.exports = router;