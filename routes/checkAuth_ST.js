var express = require('express');
var router = express.Router();

//處理GET, POST, PUT, DELETE等所有請求
router.all('/', function(req, res, next) {
    //檢查是否有session註記
    var user = req.session.user_type;
    
    if(user == null){
        res.render('unlogin');
    }else if(user == undefined){
        res.render('loginFail');  //非本系師生
    }else{
        next();
    }
});

module.exports = router;

