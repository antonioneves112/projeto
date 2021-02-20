var pool = require('./connectBd');



module.exports.getAllModalidades = async function () {
    try {
        let sql = "SELECT * from modalidades";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}


module.exports.getAllModalidadesComInstrutor = async function () {
    try {
        let sql = " SELECT m.*,i.nome from modalidades AS m inner join instrutores AS i on m.id_modalidade = i.id_modalidade; ";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}



module.exports.addModalidade = async function (modalidade) {
    try {
        let sql = "INSERT INTO modalidades(modalidade,nif_instrutor) VALUES (?,?)";
        let result = await pool.query(sql, [modalidade.modalidade, modalidade.nif]);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 200, data: error };
    }
}



module.exports.deleteModalidade = async function (nif) {
    try {
        let sql = "DELETE FROM modalidades WHERE id_modalidade = ?;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}
/*

module.exports.getModalidade = async function (id_modalidade) {
    try {
        let sql = "SELECT * FROM modalidades WHERE id_modalidade=?";
        let result = await pool.query(sql, [id_modalidade]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

*/