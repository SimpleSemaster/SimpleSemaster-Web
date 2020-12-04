var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
var today = require('silly-datetime');
const bookingdevice = require('./utility/bookingdevice');

//接收POST請求
router.post('/', function(req, res, next) {
    var userno = req.body.userno;               //學號
    var category = req.body.category;           //設備
    var bookingdate = today.format("YYYY-MM-DD HH:mm:ss"); //申請日期 
    var borrowdate = moment(req.body.borrowdate).format("YYYY-MM-DD HH:mm:ss");       //借用日
    var returndate = moment(req.body.returndate).format("YYYY-MM-DD HH:mm:ss");       //歸還日
    var teleno = req.body.teleno;               //連絡電話
    var borrowweek =  moment(req.body.borrowdate).format("E");  //借用日的星期
    var returnwweek =  moment(req.body.returndate).format("E");  //歸還日的星期

    req.session.bookingdate = bookingdate;

    // 建立一個新資料物件
    var newData={
        userno:userno,
        category:category,
        bookingdate:bookingdate,
        borrowdate:borrowdate,
        returndate:returndate,
        teleno:teleno
    } 
    console.log(newData);

    bookingdevice.query_verify(userno).then(data => {
        if (data==null){
           console.log('error');  //導向錯誤頁面
        }else if(data==-1){

            if (borrowdate >= returndate){
                res.render('bt_less_et');
            }else if(borrowweek == '6' || borrowweek == '7'){
                res.render('borrowweek');
            }else if(returnwweek == '6' || returnwweek == '7'){
                res.render('returnwweek');
            }else{
                bookingdevice.add(newData).then(d => {
                    if (d==0){
                        console.log("addSuccess bookingdevice");

                        bookingdevice.query(bookingdate).then(data => {
                            if (data==null){
                               console.log('error');  //導向錯誤頁面
                               res.render('error');
                            }else if(data==-1){
                                console.log('notFound');     
                                res.render('notFound');     
                            }else{
                                var bookingdeviceno = data.bookingdeviceno;
                                // 建立一個新資料物件到bookingdevice_detail
                                var newData_detail={bookingdeviceno:bookingdeviceno}  

                                bookingdevice.add_detail(newData_detail).then(d => {
                                    if (d==0){
                                        res.render('audit');    //已送交審核
                                    }else{
                                        res.render('auditFail');
                                    }  
                                })
                            }  
                        })
                    }else{
                        res.render('addFail');     //導向錯誤頁面
                    }  
                })
            }
            
        }else{
            var data = {
                userno: userno,
                startdate:  moment(data.startdate).format("YYYY-MM-DD"),   //懲罰開始日
                finishdate: moment(data.finishdate).format("YYYY-MM-DD")    //懲罰結束日
            }
            console.log(data);
            if(bookingdate > data.startdate & bookingdate < data.finishdate){ 
                res.render('inPunish');
            }else{
                if (borrowdate >= returndate){
                    res.render('bt_less_et');
                }else if(borrowweek == '6' || borrowweek == '7'){
                    res.render('borrowweek');
                }else if(returnwweek == '6' || returnwweek == '7'){
                    res.render('returnwweek');
                }else{
                    bookingdevice.add(newData).then(d => {
                        if (d==0){
                            console.log("addSuccess bookingdevice");
    
                            bookingdevice.query(bookingdate).then(data => {
                                if (data==null){
                                   res.render('error');
                                }else if(data==-1){
                                    res.render('notFound');     
                                }else{
                                    var bookingdeviceno = data.bookingdeviceno;
                                    // 建立一個新資料物件到bookingdevice_detail
                                    var newData_detail={bookingdeviceno:bookingdeviceno}  
    
                                    bookingdevice.add_detail(newData_detail).then(d => {
                                        if (d==0){
                                            res.render('audit');    //已送交審核
                                        }else{
                                            res.render('auditFail');
                                        }  
                                    })
                                }  
                            })
                        }else{
                            res.render('addFail');     //導向錯誤頁面
                        }  
                    })
                }
            }
        }  
    })
});

module.exports = router;