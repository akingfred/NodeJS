const conn = require('../mysql/connection.js');
const dateFormat = require('dateformat');

module.exports = function(req,res){
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var skip = req.body.skip;
    var pageSize = req.body.pageSize;
    console.log("입력값 => startDate : " + startDate + " , endDate : " + endDate);

    var objs = [];
    var query = 'SELECT * FROM SALES_DATA WHERE 1=1 ';
    if(startDate != '' && endDate !=''){
        query += " AND SALE_DATE BETWEEN '"+startDate+"' AND '"+endDate+"'";
    }

    var totalQuery = "SELECT COUNT(1) AS total FROM( "+query+" )T";
    query += " LIMIT "+skip+" , "+pageSize;
    console.log("query : "+totalQuery);
    var totalCount = 0;
    conn.query(totalQuery,function(err,result,fields){
        if(!err){
            console.log('TotalCount : ', result[0].total);
            totalCount = result[0].total;
        }else{
            console.log('Error While performing Query',err);
        }
    });

    console.log("query : "+query);
    conn.query(query,function(err,result,fields){
        if(!err){
            console.log('ROWs : ', result);
            for(var i = 0; i < result.length;i++){
                objs.push({
                    SALE_DATE : dateFormat(result[i].SALE_DATE, "yyyy-mm-dd"),
                    LN_PARTNER : result[i].LN_PARTNER,
                    CD_ITEM : result[i].CD_ITEM,
                    NM_ITEM : result[i].NM_ITEM,
                    MAT_ITEM : result[i].MAT_ITEM,
                    SALE_NUM : result[i].SALE_NUM,
                    SALE_AMT : result[i].SALE_AMT,
                    ETC : result[i].ETC
                });
            }
            res.send({list:objs,totalCount:totalCount});
        }else{
            console.log('Error While performing Query',err);
        }
    });
    
}