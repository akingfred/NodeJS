const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
//const conn = require('../mysql/connection.js');

//Custom Modules
const selectItem = require('../modules/selectItem.js');
const selectSalesData = require('../modules/selectSalesData.js');
const productReg = require('../modules/productReg.js');
const excelUpload = require('../modules/excelUpload.js');
const download = require('../modules/download.js');
const selectImage = require('../modules/selectImage.js');
const salesChart = require('../modules/salesChart.js');
//File Upload
const upload = multer({dest:'upload/',limits: {fileSize: 5 * 1024 * 1024}});

router.route('/').get(index);
router.route('/show').get(show);
router.route('/imageShow').get(imageShow);
router.route('/salesData').get(salesData);
router.route('/selectItem').post(selectItem);
router.route('/selectImage').post(selectImage);
router.route('/selectSalesData').post(selectSalesData);
router.route('/salesChart').post(salesChart);
router.route('/download').get(download);
router.route('/showChart').get(showChart);
router.post('/itemReg',upload.single('imageFile'),productReg);
router.post('/excelUpload',upload.single('excelFile'),excelUpload);
module.exports = router;

function index(req,res){
    res.sendFile(path.resolve('html/index.html'));
}
function show(req,res){
    res.sendFile(path.resolve('html/show.html'));
}
function imageShow(req,res){
    res.sendFile(path.resolve('html/imageShow.html'));
}
function salesData(req,res){
    res.sendFile(path.resolve('html/salesData.html'));   
}
function showChart(req,res){
    res.sendFile(path.resolve('html/chart.html'));
}