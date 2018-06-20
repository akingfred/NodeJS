const conn = require('../mysql/connection.js');

module.exports = function(req,res){
    var cdItem = req.body.cdItem;
    var nmItem = req.body.nmItem;
    var skip = req.body.skip;
    var pageSize = req.body.pageSize;
    console.log("입력값 => cdItem : " + cdItem + " , nmItem : " + nmItem);

    var objs = [];
    var query = 'SELECT * FROM PRODUCT WHERE 1 = 1 ';
    if(cdItem != '' && nmItem ==''){
        query += " AND cd_item LIKE '"+cdItem+"%'";
    }else if(cdItem == '' && nmItem != ''){
        query += " AND nm_item LIKE '"+nmItem+"%'";
    }else if(cdItem != '' && nmItem != ''){
        query += " AND nm_item LIKE '"+nmItem+"%' AND cd_item LIKE '"+cdItem+"%'";
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
                    NM_ITEM : result[i].NM_ITEM,
                    CD_ITEM : result[i].CD_ITEM,
                    FILENAME : result[i].FILENAME,
                    FILETYPE : result[i].FILETYPE,
                    CD_COMPANY : result[i].CD_COMPANY,
                    ETC : result[i].ETC1,
                    USE_YN : result[i].USE_YN
                });
            }
            res.send({list:objs,totalCount:totalCount});
        }else{
            console.log('Error While performing Query',err);
        }
    });
    
}