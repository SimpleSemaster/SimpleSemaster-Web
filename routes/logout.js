var express = require('express');
var router = express.Router();

//接收POST請求
router.get('/', function(req, res, next) {       
    res.render('logout');  //傳至登出    
});

module.exports = router;