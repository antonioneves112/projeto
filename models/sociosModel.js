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

