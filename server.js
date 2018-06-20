const express = require('express');
const router = require('./router/router.js');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/css',express.static(path.resolve('css')));
app.use('/js',express.static(path.resolve('js')));
app.use('/images',express.static(path.resolve('images')));
app.use('/upload',express.static(path.resolve('upload')));

app.use(router);

app.listen(3000,function(){
    console.log('Server is Running...');
});