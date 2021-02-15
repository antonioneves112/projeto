const pool = require('./connectBd');

module.exports.getTurmasAlunos = async function () {
    try {
        let sql = "select t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade;";
        let result = await pool.query(sql);
        return { status: 200, data: result }

    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }



}

module.exports.deleteALunoTurma = async function (nif_socio, id_aula) {
    try {
        let sql = "delete from turmas where nif_socio=? and id_aula=?;";
        let result = await pool.query(sql, [nif_socio, id_aula]);
        return { status: 200, data: result }

    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
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





module.exports.getTurmasAlunosId = async function (nif_socio) {
    try {
        
        let sql = "select t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade WHERE  t.nif_socio=?;";
        let result = await pool.query(sql,[nif_socio]);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}


module.exports.getTurmasAlunosInstrutor = async function (nif) {
    try {
        
        let sql = "select t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade WHERE  i.nif=?;";
        let result = await pool.query(sql,[nif]);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}




































//___________________________________________________________________________________________________________________________________________________________________________________________ 


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
        let result = await pool.query(sql, [turma.nif_socio, turma.id_aula]);
        return { status: 200, data: result }


    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }

}