const conn = require('../mysql/connection.js');

module.exports = function(req,res){
    var objs = [];
    var query = 'SELECT A.CD_ITEM ,'+
                    'SUM(A.SALE_NUM) as SALE_NUM,'+
                    'SUM(A.SALE_AMT) as SALE_AMT ,B.FILENAME' + 
                ' FROM sales_data A JOIN product B ON A.cd_item = B.cd_item'+
                ' GROUP BY A.NM_ITEM'+
                ' ORDER BY SUM(A.SALE_NUM) desc';
    console.log("query : "+query);
    conn.query(query,function(err,result,fields){
        if(!err){
            console.log('ROWs : ', result);
            for(var i = 0; i < result.length;i++){
                objs.push({
                    CD_ITEM : result[i].CD_ITEM,
                    SALE_NUM : result[i].SALE_NUM,
                    SALE_AMT : result[i].SALE_AMT,
                    FILENAME : result[i].FILENAME
                });
            }
            res.send({list:objs,totalCount:objs.length});
        }else{
            console.log('Error While performing Query',err);
        }
    });
}