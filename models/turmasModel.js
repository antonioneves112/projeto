const pool = require('./connectBd');




module.exports.getListagemAlunosTurma = async function () {
    try {
        let sql = "select * from modalidades AS m inner join instrutores AS i on m.id_modalidade=i.id_modalidade inner join aulas AS a on i.nif=a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on t.nif_socio = s.nif_socio";

        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        console.log('erro no model listagem alunos turma ');
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





/*
//LISTA TODOS OS ALUNOS DA TABELA TURMA
module.exports.getTurmasAlunos = async function () {
    try {
        let sql = "SELECT t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

//FILTRO POR SÓCIO
module.exports.getTurmasAlunosId = async function (nif_socio) {
    try {
        let sql = "SELECT t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade WHERE  t.nif_socio=?;";
        let result = await pool.query(sql,[nif_socio]);
        return { status: 200, data: result };
    } catch (error) {
        return { status: 500, data: error };
    }
}

//FILTRO POR INSTRUTOR
module.exports.getTurmasAlunosInstrutor = async function (nif) {
    try {
        let sql = "SELECT t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade WHERE  i.nif=?;";
        let result = await pool.query(sql,[nif]);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}


// MOSTRAR NO SEPARADOR TURMAS NO HOME OS ALUNOS DE CADA INSTUTOR
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
        let sql = "SELECT s.nif_socio,s.nome_socio from socios AS s;";
        let result = await pool.query(sql);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

//ROTA PARA ADICIONAR ALUNO NA TURMA
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

//ROTA PARA ELIMINAR ALUNO DA TURMA
module.exports.deleteALunoTurma = async function (nif_socio, id_aula) {
    try {
        let sql = "DELETE FROM turmas WHERE nif_socio=? and id_aula=?;";
        let result = await pool.query(sql, [nif_socio, id_aula]);
        return { status: 200, data: result }

    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}

//ROTA PARA ADICIONAR ALUNO NA TURMA
*/