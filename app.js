var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//CARREGAR AS ROTAS QUE SE ENCONTRAM NA PASTA ROUTES
var modalidadesRouter = require('./routes/modalidades');
var sociosRouter = require('./routes/socios');
var treinadoresRouter = require('./routes/treinadores')



//INSTÂNCIA DO EXPRESS
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//USAR ROTAS
app.use('/gym/modalidades',modalidadesRouter);
app.use('/gym/socios',sociosRouter);
app.use('/gym/treinadores',treinadoresRouter);






module.exports = app;
