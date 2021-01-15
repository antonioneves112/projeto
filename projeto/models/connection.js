const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    passowrd:'Antonioneves112',
    database:'projeto'
})

//PING BASE DE DADOS PARA VERIFICAR SE EXISTEM EXCEPTION ERRORS
pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Aconexão com a base de dados foi fechada')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Base de dados tem muitas conexões')
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Ligação com a base de dados foi rejeitada')
        }


    }

    if (connection) connection.release()
    return 
})

//PROMISE PARA NODE:JS ASYNC/AWAIT
pool.query = util.promisify(pool.query)

module.exports = pool
