var pool = require('./connectBd');



module.exports.getAllInstrutores = async function () {
    try {
        let sql = " SELECT i.*,m.modalidade FROM instrutores AS i  inner join modalidades AS m on i.id_modalidade=m.id_modalidade; ";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

module.exports.getInstrutor = async function (nif) {
    try {
        let sql = "SELECT * FROM instrutores WHERE nif = ? ";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }

    } catch (error) {
        console.log(error);
        return { status: 200, data: error }
    }
}

module.exports.getmodalidadesInstrutor = async function () {
    try {
        let sql = "select id_modalidade, modalidade from modalidades";
        let result = await pool.query(sql);
        return { status: 200, data: result };

    } catch (error) {
        console.log(error);
        return {
            status: 500, data: error
        };

    }
}

module.exports.addInstrutor = async function (instrutor) {
    try {
        let sql = "insert into instrutores (nif, nome, contacto, email, id_modalidade) VALUES (?,?,?,?,?)";
        let result = await pool.query(sql, [instrutor.nif, instrutor.nome, instrutor.contacto, instrutor.email, instrutor.id_modalidade]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

module.exports.updateInstrutor = async function (instrutor) {
    try {
        let sql = "UPDATE instrutores SET nome=?,contacto=?,email=?,id_modalidade=? WHERE nif=?;";
        let result = await pool.query(sql, [instrutor.nome, instrutor.contacto, instrutor.email, instrutor.id_modalidade, instrutor.nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

module.exports.deleteInstrutor = async function (nif) {
    try {
        let sql = "DELETE FROM instrutores WHERE nif=?;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result };

    } catch (error) {
        console.log(error);
        return {
            status: 500, data: error
        };
    }
}


