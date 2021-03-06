const pool = require('./connectBd');

module.exports.getAulas = async function () {
    try {
        let sql = "select a.*,i.nome from aulas AS a inner join instrutores AS i on i.nif = a.nif_instrutor;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 200, data: result }
    }
}

module.exports.getAulasHorarios = async function () {
    try {
        let sql = "select a.id_aula, m.modalidade from aulas AS a inner join instrutores AS i on a.nif_instrutor = i.nif inner join modalidades AS m on m.id_modalidade = i.id_modalidade; ";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 200, data: result }
    }
}

module.exports.addAula = async function (aulas) {
    try {
        let sql = "INSERT INTO aulas (nif_instrutor) VALUES (?)";
        let result = await pool.query(sql, [aulas.nif_instrutor]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

module.exports.apagaAula = async function (nif) {
    try {
        let sql = "DELETE from aulas where id_aula = ?";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}