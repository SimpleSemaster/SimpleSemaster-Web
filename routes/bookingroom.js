var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
var today = require('silly-datetime');
const bookingroom = require('./utility/bookingroom');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/picture');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=1024*1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})

//接收POST請求
router.post('/', upload.single('evidence'), function(req, res, next) {
    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        // 傳入檔案不可超過maxSize
        if(req.file.size > maxSize){
            res.render('fileSizeError');  //圖片過大
            return;
        }                      
    }  

    var userno = req.body.userno;      //使用者編號                 
    var reason = req.body.reason;      //原因
    var roomno = req.body.roomno;      //教室 
    var bookingdate = today.format("YYYY-MM-DD HH:mm:ss"); //申請日期
    var borrowdate = moment(req.body.borrowdate).format("YYYY-MM-DD");  //借用日  
    var endtime = req.body.endtime;   //歸還時間
    var evidence;     //圖片歸還時間
    var role = req.body.role;           //身分
    var borrowtime = req.body.borrowtime;   //借用時間

    var borrowweek =  moment(req.body.borrowdate).format("E");  //借用日的星期

    req.session.bookingdate = bookingdate;  //借用日  
    req.session.roomno = roomno;    //教室編號
    req.session.userno = userno;    //使用者編號
    req.session.borrowdate = borrowdate;    //借用日
    req.session.borrowtime = borrowtime;    //借用時間
    req.session.endtime = endtime;    //歸還時間

    // 如果有選擇圖片
    if (typeof(req.file) != 'undefined'){
        evidence=req.file.filename;   //取得上傳照片名稱
    }


    // 建立一個新資料物件
    var newData={
        userno:userno,
        reason:reason,
        bookingdate:bookingdate,
        borrowdate:borrowdate,
        endtime:endtime,
        evidence:evidence,
        role:role,
        borrowtime:borrowtime
    } 

    //計算時間差----------------------------------------------------
    var btime = new Date(borrowdate + " " + borrowtime);
    var etime = new Date(borrowdate + " " + endtime);
    var dif = etime.getTime() - btime.getTime();

    //計算出小時數
    var leave1=dif%(24*3600*1000);    //計算天數後剩餘的毫秒數
    var hours=Math.floor(leave1/(3600*1000));

    //計算相差分鐘數
    var leave2=leave1%(3600*1000);        //計算小時數後剩餘的毫秒數
    var minutes=Math.floor(leave2/(60*1000));

    var dt = hours + ":" + minutes;
    console.log("dt：" + dt);
    //----------------------------------------------------------------
  
    //取得今天後 7 日的時間---------------------------------------------
    var bdate = new Date(bookingdate);
    var mo = bdate.getMonth() + 1;
    console.log("mo：" + mo);       //月

    var bd = bdate.getDate() + 14;
    console.log('bd：' + bd);       //日

    if(mo == '1' || mo == '3' || mo == '5' || mo == '7' || mo == '8' || mo == '10' || mo == '12'){
        if(bd/31 > 0){
            var nbd = bd%31;
            var nmo = mo;
        }else{
            var nbd = bd%31;
            var nmo = bdate.getMonth();
        }
    }else{
        if(bd/30 > 0){
            var nbd = bd%30;
            var nmo = mo+1;
        }else{
            var nbd = bd%30;
            var nmo = bdate.getMonth();
        }
    }

    console.log("nmo：" + nmo);       //月
    console.log('nbd：' + nbd);       //日

    var new_bd = nmo + "/" + nbd;
    console.log("new_bd：" + new_bd);
    
    //----------------------------------------------------------------
    bookingroom.query_verify(userno).then(data => {
        if (data==null){
           console.log('error');  //導向錯誤頁面
           res.render('error');
        }else if(data==-1){
            console.log("未有違規事項"); 

            if (borrowtime >= endtime){
                console.log('歸還時間不能小於借用時間');
                res.render('bt_less_et');
            }else if(borrowweek == '6' || borrowweek == '7'){
                console.log('假日無法借用');
                res.render('borrowweek');
            }else if(borrowdate < bookingdate || borrowdate < new_bd){
                console.log('只能借兩週內的教室(包含當週)');
                res.render('bd_more_newbd');
            }else if(borrowtime < "08:00" || endtime > "21:50"){
                console.log("早上8點前以及晚上9：50之後不借用");
                res.render('bt_between_et');
            }else if(role == "4" && dt > "2:00"){
                console.log("借用時間不可以大於2小時");
                res.render('bt_less_two');
            }else if(role == "2" && evidence == ""){
                console.log("TA借用教室必須有證明文件");
                res.render('evidence_null');
            }else{
                bookingroom.add(newData).then(d => {
                    if (d==0){
                        console.log('add：addSuccess');

                        //-----------------------------------------------------
                        var yesorno = 't';
    
                        bookingroom.query_borrowdate(borrowdate, borrowtime, endtime, roomno, yesorno).then(data => {
                            
                            if (data==null){                               
                                bookingroom.query(bookingdate).then(data => {
                                    if (data==null){
                                       console.log('error');  //導向錯誤頁面
                                       res.render('error');
                                    }else if(data==-1){
                                        console.log('notFound');     
                                        res.render('notFound');     
                                    }else{
                                        console.log('data：',data); 
                                        req.session.data = data;

                                        //-----------------------------------------------------
                                        var bookingroomno = data.bookingroomno;

                                        // 建立一個新資料物件
                                        var newData_detail={
                                            bookingroomno:bookingroomno,
                                            roomno:roomno
                                        }   

                                        bookingroom.add_detail(newData_detail).then(d => {
                                            if (d==0){
                                                res.render('audit');    //已送交審核
                                            }else{
                                                res.render('addFail');
                                            }  
                                        })
                                    }  
                                })
                            }else if(data==-1){  
                                res.render('notFound');     
                            }else if(data.length > 0){
                                console.log(data);
                                res.render('haveuse');
                            }else{
                                bookingroom.query(bookingdate).then(data => {
                                    if (data==null){
                                       console.log('error');  //導向錯誤頁面
                                       res.render('error');
                                    }else if(data==-1){
                                        console.log('notFound');     
                                        res.render('notFound');     
                                    }else{
                                        console.log('data：',data); 
                                        req.session.data = data;

                                        //-----------------------------------------------------
                                        var bookingroomno = data.bookingroomno;

                                        // 建立一個新資料物件
                                        var newData_detail={
                                            bookingroomno:bookingroomno,
                                            roomno:roomno
                                        }   

                                        bookingroom.add_detail(newData_detail).then(d => {
                                            if (d==0){
                                                res.render('audit');    //已送交審核
                                            }else{
                                                res.render('addFail');
                                            }  
                                        })
                                    }  
                                })
                            }
                        })
                    }else{
                        res.render('addFail');
                    }
                });
            }
        }else{
            var data = {
                userno: userno,
                startdate:  moment(data.startdate).format("YYYY-MM-DD"),   //懲罰開始日
                finishdate: moment(data.finishdate).format("YYYY-MM-DD")    //懲罰結束日
            }
            console.log(data);
            console.log(bookingdate);
            if(bookingdate > data.startdate & bookingdate < data.finishdate){ 
                res.render('inPunish');
            }else{
                if (borrowtime >= endtime){
                    res.render('bt_less_et');
                }else if(borrowweek == '6' || borrowweek == '7'){
                    res.render('borrowweek');
                }else if(borrowdate < bookingdate || borrowdate < new_bd){
                    res.render('bd_more_newbd');
                }else if(borrowtime < "08:00" || endtime > "21:50"){
                    res.render('bt_between_et');
                }else if(role == "4專題" && dt > "2:00"){
                    res.render('bt_less_two');
                }else if(role == "2TA" && evidence == ""){
                    res.render('evidence_null');
                }else{
                    bookingroom.add(newData).then(d => {
                        if (d==0){
                            console.log('add：addSuccess');

                            //-----------------------------------------------------
                            var yesorno = 't';
        
                            bookingroom.query_borrowdate(borrowdate, borrowtime, endtime, roomno, yesorno).then(data => {
                                
                                if (data==null){
                                    bookingroom.query(bookingdate).then(data => {
                                        if (data==null){
                                           res.render('error');
                                        }else if(data==-1){   
                                            res.render('notFound');     
                                        }else{
                                            console.log('data：',data); 
                                            req.session.data = data;
    
                                            //-----------------------------------------------------
                                            var bookingroomno = data.bookingroomno;
    
                                            // 建立一個新資料物件
                                            var newData_detail={
                                                bookingroomno:bookingroomno,
                                                roomno:roomno
                                            }   
    
                                            bookingroom.add_detail(newData_detail).then(d => {
                                                if (d==0){
                                                    res.render('audit');    //已送交審核
                                                }else{
                                                    res.render('addFail');
                                                }  
                                            })
                                        }  
                                    })
                                }else if(data==-1){
                                    res.render('notFound');     
                                }else if(data.length > 0){
                                    res.render('haveuse');
                                }else{
                                    bookingroom.query(bookingdate).then(data => {
                                        if (data==null){
                                        res.render('error');
                                        }else if(data==-1){
                                            res.render('notFound');     
                                        }else{
                                            console.log('data：',data); 
                                            req.session.data = data;

                                            //-----------------------------------------------------
                                            var bookingroomno = data.bookingroomno;

                                            // 建立一個新資料物件
                                            var newData_detail={
                                                bookingroomno:bookingroomno,
                                                roomno:roomno
                                            }   

                                            bookingroom.add_detail(newData_detail).then(d => {
                                                if (d==0){
                                                    res.render('audit');    //已送交審核
                                                }else{
                                                    res.render('auditFail');
                                                }  
                                            })
                                        }  
                                    })
                                }
                            })
                        }else{
                            res.render('auditFail');
                        }
                    });
                }
            }
        }
    });

});

module.exports = router;

