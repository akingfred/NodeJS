const conn = require('../mysql/connection.js');
require('date-utils');

module.exports = function(req,res){
    var cdItem = req.body.cdItem;
    var nmItem = req.body.nmItem;
    var cdCompany = req.body.cdCompany;
    var etc = req.body.etc;
    var newDate = new Date();
    var today = newDate.toFormat('YYYY-MM-DD');
    console.log("입력값 => cdItem : " + cdItem + " , nmItem : " + nmItem);
    console.log(req.file);
    var extension = "";
    var filename = "";
    if(!req.file){
        extension = "";
        filename = "";
    }else{
        extension  = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'), req.file.originalname.length);
        filename = req.file.filename;
    }
    var query = "INSERT INTO PRODUCT (cd_item,nm_item,filename,filetype,cd_company,etc1,create_date,use_yn)" +
     "VALUES ('"+cdItem+"','"+nmItem+"','"+filename+"','"+extension+"','"+cdCompany+"','"+etc+"','"+today+"','Y')";
    console.log(query);
    conn.query(query,function(err,result){
        if(!err){
            res.send("Y");
        }else{
            console.log('Error While performing Query',err);
        }
    })
}