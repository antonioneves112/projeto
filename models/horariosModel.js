const pool = require('./connectBd');

module.exports.getHorarios = async function () {
    try {
        let sql = "select h.*,m.modalidade from horarios AS h inner join aulas AS a on a.id_aula=h.id_aula inner join instrutores as i on i.nif=a.nif_instrutor inner join modalidades AS m on m.id_modalidade=i.id_modalidade  order by h.dia_semana,h.inicio;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: result }
    }
}
module.exports.getHorariosHome = async function (nif) {
    try {
        let sql = "select h.*,m.modalidade from horarios AS h inner join aulas AS a on a.id_aula=h.id_aula inner join instrutores as i on i.nif=a.nif_instrutor inner join modalidades AS m on m.id_modalidade=i.id_modalidade WHERE i.nif=? order by h.dia_semana,h.inicio;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: result }
    }
}

module.exports.getselectsemana = async function () {
    try {
        let sql = "select distinct (dia_semana) from horarios order by dia_semana;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: result }
    }
}

module.exports.gethorariosFiltrados = async function (semana) {
    try {
        let sql = "select h.*,m.modalidade from horarios AS h inner join aulas AS a on a.id_aula=h.id_aula inner join instrutores as i on i.nif=a.nif_instrutor inner join modalidades AS m on m.id_modalidade=i.id_modalidade where h.dia_semana=?;";
        let result = await pool.query(sql, [semana]);

        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: result }
    }
}



module.exports.apagaHorarios = async function (id) {
    try {
        let sql = "DELETE FROM horarios where id_horario=?";
        let result = await pool.query(sql, [id]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}
module.exports.addHorario = async function (horario) {
    try {
        let sql = "insert into horarios (id_aula,dia_semana,inicio,fim) VALUES (?,?,?,?);";
        let result = await pool.query(sql, [horario.id_aula, horario.dia_semana, horario.inicio, horario.fim]);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}