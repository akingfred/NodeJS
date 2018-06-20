const conn = require('../mysql/connection.js');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
require('date-utils');

module.exports = function(req,res){
    console.log(req.file);
    var filename = req.file.filename;
    var filepath = path.resolve('upload');
    var workbook = xlsx.readFile(filepath+'/'+filename);

    var first_sheet_name = workbook.SheetNames[0];
    
    /*Get WorkSheet*/
    var worksheet = workbook.Sheets[first_sheet_name];

    /*Find desired cell */
    var array = convertExcellToArray(worksheet);

    for(var i = 1; i < array.length; i++){
        var date = (array[i][0] != ''&&array[i][0] != null)?array[i][0]:'';
        var strArray = date.split('/');
        var newDate = new Date("20"+strArray[2],strArray[1],strArray[0]);
        date = newDate.toFormat('YYYY-MM-DD');

        var lnPartner = (array[i][1] != ''&&array[i][1] != null)?array[i][1]:'';
        var cdItem = (array[i][2] != ''&&array[i][2] != null)?array[i][2]:'';
        var nmItem = (array[i][3] != ''&&array[i][3] != null)?array[i][3]:'';
        var saleNum = (array[i][4] != ''&&array[i][4] != null)?array[i][4]:'';
        var saleAmt = (array[i][5] != ''&&array[i][5] != null)?array[i][5]:'';
        var etc = (array[i][6] != ''&&array[i][6] != null)?array[i][6]:'';

        if(date != '' && date != null && cdItem != null && cdItem != '' && nmItem != null && nmItem != '' && saleNum != null && saleNum != '' && saleAmt != null && saleAmt != ''){
            var query = "INSERT INTO SALES_DATA (sale_date,ln_partner,cd_item,nm_item,sale_num,sale_amt,etc,use_yn)" +
            "VALUES ('"+date+"','"+lnPartner+"','"+cdItem+"','"+nmItem+"','"+saleNum+"','"+saleAmt+"','"+etc+"','Y')";
            conn.query(query,function(err,result){
                if(!err){
                   
                }else{
                    console.log('Error While performing Query',err);
                }
            });
        }else{
            
        }
    }
    res.send('Y');

    fs.unlink(filepath+'/'+filename, function (err) { 
        if (err) throw err; 
        console.log('successfully deleted ExcelFile');
    });
}

function convertExcellToArray(sheet){
    var result = [];
   var row;
   var rowNum;
   var colNum;
   var range = xlsx.utils.decode_range(sheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = [];
       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = sheet[
            xlsx.utils.encode_cell({r: rowNum, c: colNum})
          ];
          if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell.w);
       }
       result.push(row);
   }
   return result;
}