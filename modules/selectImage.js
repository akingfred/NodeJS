const conn = require('../mysql/connection.js');

module.exports = function(req,res){
    var cdItem = req.body.cdItem;
    var nmItem = req.body.nmItem;
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
            res.send({list:objs,totalCount:objs.length});
        }else{
            console.log('Error While performing Query',err);
        }
    });
    
}