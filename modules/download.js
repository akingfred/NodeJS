const mime = require('mime');
const fs = require('fs');
const path = require('path');

module.exports = function(req,res){
    var filename = 'form.xlsx';
    var filepath = path.resolve('download');

    mimetype = mime.lookup(filename);

    res.setHeader('Content-disposition','attachment; filename='+filename);

    res.setHeader("Content-Transfer-Encoding", "binary");
    var filestream = fs.createReadStream(filepath+"/"+filename).on('error',function(err){
        console.log('Excel download Error : '+err);
    });
    filestream.pipe(res).on('finish',()=> console.log('Done'));
}