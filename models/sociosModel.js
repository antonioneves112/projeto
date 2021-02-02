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




module.exports.registaSocio = async function (socio){
    try {
        let sql = "insert into socios "+"(nif_socio, nome_socio, morada, email, telefone, nib) "+
        "values (?,?,?,?,?,?)";
        
        let result = await pool.query(sql,[socio.nif_socio,socio.nome_socio,socio.morada,socio.email,socio.telefone.socio.nib]);
        return {status:200,data:result};
    } catch (error) {
        console.log(error);
        return {status:500,data:err};
    }
}