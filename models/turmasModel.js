const pool = require('./connectBd');


module.exports.getTurmas = async function () {
    try {
        let sql = "select i.nif,i.nome, t.id_aula, s.nome_socio, t.nif_socio from instrutores AS i inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas AS t " +
            "on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio order by a.nif_instrutor;";




        let result = await pool.query(sql);
        return { status: 200, data: result }

    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}


module.exports.DeleteAlunoTurma = async function (nif_socio, id_aula) {
    console.log(id_aula);
    console.log(nif_socio);
    try {
        let sql = "delete from turmas  where nif_socio =? and id_aula =?;";
        let result = await pool.query(sql, [nif_socio, id_aula]);
        console.log(result + 'xxxxxx')
        return { status: 200, data: result }


    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}


module.exports.addSocioTurma = async function (turma) {
    try {

        console.log(turma);
        let sql = "insert into turmas(nif_socio,id_aula) VALUES (?,?);";
        let result = await pool.query(sql, [turma.nif_socio,turma.id_aula]);
        return { status: 200, data: result }


    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }

}