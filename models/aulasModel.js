var pool = require('./connectBd');

module.exports.getAllTurmas = async function () {
    try {
        let sql = "SELECT * from turmas";
        let result = await pool.query(sql);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

module.exports.getAllTurmasModalidade = async function () {
    try {
        let sql = "select id_aula, concat(i.nome ,' - ' , m.modalidade) as descricao from  instrutores i inner join  modalidades m  on m.id_modalidade =i.id_modalidade inner join aulas a on a.nif_instrutor =i.nif;";
        let result = await pool.query(sql);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}




module.exports.getAllTurmasSocioAula = async function () {
    try {
        let sql = "select s.nif_socio,s.nome_socio from socios AS s;";
        let result = await pool.query(sql);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}






