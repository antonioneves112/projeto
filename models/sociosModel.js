//================================================= MODEL SÓCIO ==========================================================================================================

var pool = require('./connectBd');



module.exports.getAllSocios = async function (){
    try {
        let sql = "SELECT * FROM socios";
        let socios = await pool.query(sql);
        return {status:200,data:socios};

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}

module.exports.getOne = async function(nif_socio) {
    try {
        let sql = "select * from socios WHERE nif_socio = ?"
        let socio = await pool.query(sql,[nif_socio]);
        return {status:200, data: socio};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}


module.exports.addSocio = async function (socio){
    try {
        let sql = "INSERT INTO socios(nif_socio,nome_socio,morada,email,telefone,nib) "+
        "VALUES (?,?,?,?,?,?)"
        
        let result = await pool.query(sql,[socio.nif_socio,socio.nome_socio,socio.morada,socio.email,socio.telefone,socio.nib]);
        return {status:200,data:result};

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}