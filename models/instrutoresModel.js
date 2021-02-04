var pool = require('./connectBd');


module.exports.getAll = async function(){
    try {
        let sql = "SELECT * FROM instrutores";
        let result = await pool.query(sql);
        return {status:200,data:result}

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}

module.exports.addInstrutor = async function(instrutor){
    try {
        let sql = "INSERT INTO instrutores (nif,nome,contacto,email) VALUES (?,?,?,?)";

        let result = await pool.query(sql,[instrutor.nif,instrutor.nome,instrutor.contacto,instrutor.email]);
        return {status:200,data:result};
    
    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
 
}


module.exports.getInstrutor = async function (instructor){

    try {
        let sql = "SELECT * FROM instrutores WHERE nif = ? ";
        let result = await pool.query(sql,[instrutor.nif])
        return {status:200,data:result}
    } catch (error) {
        console.log(error);
        return {status:200,data:error};
    }
}
