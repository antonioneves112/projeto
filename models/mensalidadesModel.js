var pool = require('./connectBd');

//CONSULTA NA BASE DE DAODS E RETORNA UM OBJETO COM OS VALORES DA CONSULTA
module.exports.getMensalidades = async function (){
try {
    let sql = "SELECT * FROM mensalidade";
    let result = await pool.query(sql);
    return {status:200,data:result}
} catch (error) {
    console.log(error);
    return {status:500,data:error}
}

}

//CRIA UMA NOVA MENSALIDADE
module.exports.addMensalidade = async function (mensalidade){
    try {
        let sql = "insert into mensalidade(nif_socio,data_vencimento,data_pagamento,valor,pago) VALUES (?,?,?,?,?);";
        let result = await pool.query(sql,[mensalidade.nif_socio,mensalidade.data_vencimento,mensalidade.data_pagamento,mensalidade.valor,mensalidade.pago]);
        return {status:200,data:result}
    } catch (error) {
        console.log(error);
        return{status:500,data:error};
    }
}


module.exports.deletaMensalidade = async function (id_mensalidade) {
    try {
        let sql = "DELETE FROM mensalidade WHERE id_mensalidade= ?;";
        let result = await pool.query(sql,[id_mensalidade]);
        return {status:200,data:result};
    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}