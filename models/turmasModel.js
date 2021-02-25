const pool = require('./connectBd');




module.exports.getListagemAlunosTurma = async function () {
    try {
        let sql = "select * from modalidades AS m inner join instrutores AS i on m.id_modalidade=i.id_modalidade inner join aulas AS a on i.nif=a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on t.nif_socio = s.nif_socio";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

module.exports.filtroInstrutor = async function (nif) {
    try {
        let sql = "select * from modalidades AS m inner join instrutores AS i on m.id_modalidade=i.id_modalidade inner join aulas AS a on i.nif=a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on t.nif_socio = s.nif_socio WHERE i.nif=?;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }

    }
}

module.exports.filtroSocio = async function (nif) {
    try {
        let sql = "select * from modalidades AS m inner join instrutores AS i on m.id_modalidade=i.id_modalidade inner join aulas AS a on i.nif=a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on t.nif_socio = s.nif_socio WHERE  s.nif_socio=?;";
        let result = await pool.query(sql, [nif]);
        console.log(result);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }

    }
}


module.exports.selectIdaula = async function () {
    try {
        let sql = "select DISTINCT a.id_aula, m.modalidade  from turmas AS t inner join aulas AS a on t.id_aula = a.id_aula right join modalidades AS m on m.nif_instrutor = a.nif_instrutor;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }

    }
}


module.exports.addSocioTurma = async function (socioturma) {
    try {
        let sql = "INSERT into turmas (nif_socio,id_aula) VALUES (?,?);";
        let result = await pool.query(sql, [socioturma.nif_socio, socioturma.id_aula]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

module.exports.apagaDaTurma = async function (nif_socio, id_aula) {
    try {
        let sql = "DELETE from turmas where nif_socio=? and id_aula=?;"
        let result = await pool.query(sql, [nif_socio, id_aula]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

