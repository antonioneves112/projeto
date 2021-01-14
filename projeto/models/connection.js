var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit:20,
    host: 'localhost',
    user:'root',
    password:'Antonioneves112',
    database:'chinook'
});

//FAZ PING A BASE DE DADOS PARA VERIFICAR SE EXISTEM ERROS 


