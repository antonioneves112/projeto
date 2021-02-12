//================================================= MODEL SÓCIO ==========================================================================================================

var pool = require('./connectBd');


//RECEBE TODOS OS ALUNOS DA BASE DE DADOS
module.exports.getAllSocios = async function (){
    try {
        let sql = "select * from socios AS s inner join VIEW_modalidadessocios AS v on s.nif_socio = v.nif_socio;";
        let socios = await pool.query(sql);
        return {status:200,data:socios};

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}



module.exports.getSocio = async function(nif_socio){
    try {
        let sql = "SELECT * FROM socios WHERE nif_socio =?";
        let socio = await pool.query(sql,[nif_socio]);

        return {status:200,data:socio}

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}
module.exports.getTurma = async function(nif){
    try {
        let sql = "select  s.*  from instrutores AS i  inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas AS t on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio where i.nif =?;";
        let socios = await pool.query(sql,[nif]);

        return {status:200,data:socios}

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}









//INSERIR SÒCIO NA BASE DE DADOS
module.exports.addSocio = async function (socio){
    try {
        let sql = "INSERT INTO socios(nif_socio,nome_socio,morada,email,telefone,nib) "+
        "VALUES (?,?,?,?,?,?)"
        
        let result = await pool.query(sql,[socio.nif_socio,socio.nome_socio,socio.morada,socio.email,socio.telefone,socio.nib]);
        return {status:200,data:result};

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}




//ATUALIZAR SOCIO
module.exports.updateSocio = async function (socio){
    try {
        let sql ="update socios set nome_socio =?,morada =? , email =?, telefone =?,nib =? WHERE nif_socio = ?;";
        let result = await pool.query(sql,[socio.nome_socio,socio.morada,socio.email,socio.telefone,socio.nib,socio.nif_socio]);
        return {status:200,data:result};

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}

//APAGAR SOCIO
module.exports.deleteSocio = async function (nif){
    try {
        let sql ="delete from socios where nif_socio = ?;";
        let result = await pool.query(sql,[nif]);
        return {status:200,data:result};

    } catch (error) {
        console.log(error);
        return {status:500,data:error};
    }
}