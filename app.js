var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//CARREGAR AS ROTAS QUE SE ENCONTRAM NA PASTA ROUTES
var sociosRouter = require('./routes/sociosRouter');
var instrutoresRouter = require('./routes/instrutoresRouter');
var modalidadesRouter = require('./routes/modalidadesRouter');
var turmasRouter = require('./routes/turmasRouter');
var mensalidadesRouter = require('./routes/mensalidadesRouter');
var aulasRouter = require('./routes/aulasRouter');
var horariosRouter = require('./routes/horariosRouter');






//INSTÂNCIA DO EXPRESS
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//USAR ROTAS

app.use('/socios',sociosRouter);
app.use('/instrutores',instrutoresRouter);
app.use('/modalidades',modalidadesRouter);
app.use('/turmas',turmasRouter);
app.use('/mensalidades',mensalidadesRouter);
app.use('/aulas',aulasRouter);
app.use('/horarios',horariosRouter);








module.exports = app;
