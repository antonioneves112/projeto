const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool ({
  connectionLimit:20,
  host:"db4free.net",
  port:'3306',
  user:'antonioneves112',
  password:'antonioneves112',
  database:'bogasteamremote'

});

//FAZ PING BASE DE DADOS PARA VERIFICAR SE EXISTEM EXCEPTION ERRORS
pool.getConnection((err,connection)=>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexão com base de dados foi terminada !')
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Base de dados com demasiadas conexões !')
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Conexão com base de dados recusada ! ')
        }
        console.log(err);
    }
    if (connection) connection.release()
    return
})

//PROMISY PARA O NODE ASYNC/AWAIT
pool.query = util.promisify(pool.query)

module.exports = pool 