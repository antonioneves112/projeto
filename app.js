var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//CARREGAR AS ROTAS QUE SE ENCONTRAM NA PASTA ROUTES
var sociosRouter = require('./routes/sociosRouter');




//INSTÂNCIA DO EXPRESS
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//USAR ROTAS
app.use('/socios',sociosRouter);







module.exports = app;
