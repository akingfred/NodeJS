  const mysql = require('mysql');
  
  var dbconfig = {
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    port     : '3306',
    database : 'test',
    charset  : 'utf8mb4' 
  };
  const conn = mysql.createConnection(dbconfig);
  conn.connect(function(){
    console.log('MySQL DataBase Connecting..');
  });
  module.exports = conn;

  /*
  CREATE TABLE `product` (
  `CD_COMPANY` varchar(11) NOT NULL COMMENT 'ERP회사코드',
  `CD_ITEM` varchar(40) NOT NULL COMMENT '품목코드',
  `NM_ITEM` varchar(400) DEFAULT NULL COMMENT 'ERP품명',
  `FILENAME` varchar(80) DEFAULT NULL COMMENT 'ERP품목URL',
  `FILETYPE` char(10) DEFAULT NULL COMMENT '상품이미지형태',
  `IMG_WIDTH` decimal(10,0) DEFAULT NULL COMMENT '이미지사이즈(width)',
  `IMG_LENGTH` decimal(10,0) DEFAULT NULL COMMENT '이미지사이즈(length)',
  `ETC1` varchar(100) DEFAULT NULL COMMENT '비고1',
  `ETC2` varchar(100) DEFAULT NULL COMMENT '비고2',
  `ETC3` varchar(100) DEFAULT NULL COMMENT '비고3',
  `CUMSTOM1` varchar(100) DEFAULT NULL COMMENT '사용자정의1',
  `CUMSTOM2` varchar(100) DEFAULT NULL COMMENT '사용자정의2',
  `CUMSTOM3` varchar(100) DEFAULT NULL COMMENT '사용자정의3',
  `USE_YN` char(2) DEFAULT NULL COMMENT '상품이미지형태',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '생성일',
  `UPDATE_DATE` datetime DEFAULT NULL COMMENT '수정일',
  PRIMARY KEY (`CD_ITEM`,`CD_COMPANY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='품목마스터';

CREATE TABLE `sales_data` (
  `SALE_DATE` date DEFAULT NULL COMMENT '날짜',
  `LN_PARTNER` varchar(100) DEFAULT NULL COMMENT '거래처명',
  `CD_ITEM` varchar(15) NOT NULL COMMENT '품목코드',
  `NM_ITEM` varchar(400) DEFAULT NULL COMMENT '폼목명',
  `MAT_ITEM` varchar(100) DEFAULT NULL COMMENT '바코드',
  `SALE_NUM` decimal(17,0) DEFAULT NULL COMMENT '매출수량1',
  `SALE_AMT` decimal(17,0) DEFAULT NULL COMMENT '매출금액1',
  `ETC` varchar(200) DEFAULT NULL COMMENT '비고',
  `USE_YN` char(2) DEFAULT NULL COMMENT '사용여부',
  `CREATE_ID` varchar(32) DEFAULT NULL COMMENT '생성자',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '생성일',
  `UPDATE_ID` varchar(32) DEFAULT NULL COMMENT '수정자',
  `UPDATE_DATE` datetime DEFAULT NULL COMMENT '수정일',
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=680 DEFAULT CHARSET=utf8mb4 COMMENT='매출데이타';
  */