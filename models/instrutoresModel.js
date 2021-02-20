
var pool = require('./connectBd');

module.exports.getTodosInstrutores = async function () {
    try {
        let sql = "select i.*, m.modalidade from instrutores AS i inner join modalidades AS m on  i.id_modalidade =  m.id_modalidade;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
    }
}

module.exports.getTodosInstrutoresHome = async function (nif) {
    try {
        let sql = "select * from instrutores AS i inner join modalidades AS m on i.id_modalidade=m.id_modalidade  where nif=?;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
    }
}


module.exports.eliminaInstrutor = async function (nif) {
    try {
        let sql = "DELETE FROM instrutores where nif=?;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
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

module.exports.getInstrutor = async function (nif) {
    try {
        let sql = "SELECT * from instrutores where nif= ?;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        return { status: 500, data: error }
    }
}


module.exports.updateInstrutor = async function (instrutor) {
    try {
        let sql = "UPDATE instrutores SET nome=?,contacto=?,email=?,id_modalidade=? WHERE nif=?;";
        let result = await pool.query(sql, [instrutor.nome, instrutor.contacto, instrutor.email, instrutor.id_modalidade, instrutor.nif]);
        console.log(result);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}