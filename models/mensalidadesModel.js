var pool = require('./connectBd');


//CONSULTA PARA RECOLHER TODAS AS MENSALIDADES NA BASE DE DADOS
module.exports.listarMensalidades = async function () {
    try {
        let sql = "select id_mensalidade,m.nif_socio,DATE_FORMAT(data_vencimento,'%d-%m-%Y') AS data_vencimento,DATE_FORMAT(data_pagamento,'%d-%m-%Y') AS data_pagamento,valor,pago,data_update,mes,s.nome_socio from mensalidade AS m inner join socios as s on m.nif_socio=s.nif_socio order by data_vencimento; ";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }
}


//CONSULTAR TODAS AS MENSALIDADES ATRAVÉS DO FILTRO NIF DE SÒCIO
module.exports.FiltroMensalidadeSocio = async function (nif) {
    try {
        let sql = "SELECT id_mensalidade,m.nif_socio,DATE_FORMAT(data_vencimento,'%d-%m-%Y') AS data_vencimento,DATE_FORMAT(data_pagamento,'%d-%m-%Y') AS data_pagamento,valor,pago,data_update,mes,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.nif_socio=? order by data_vencimento desc ;";
        let result = await pool.query(sql, [nif]);
        return { status: 200, data: result }
    } catch (error) {
        return { status: 500, data: error }
    }
}

//CONSULTAR TODAS AS MENSALIDADES ATRAVÉS FILTRO  DO ESTADO DE PAGAMENTO DA MENSALIDADE
module.exports.FiltroMensalidadePago = async function (pago) {
    try {
        let sql = "SELECT id_mensalidade,m.nif_socio,DATE_FORMAT(data_vencimento,'%d-%m-%Y') AS data_vencimento,DATE_FORMAT(data_pagamento,'%d-%m-%Y') AS data_pagamento,valor,pago,data_update,mes,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.pago=? order by data_vencimento desc ;";
        let result = await pool.query(sql, [pago]);
        return { status: 200, data: result }
    } catch (error) {
        return { status: 500, data: error }
    }
}

//CONSULTAR TODAS AS MENSALIDADES ATRAVÈS DO FILTRO  POR MÊS
module.exports.FiltroMensalidadeMes = async function (mes) {
    try {
        if (mes != -1) {
            let sql = "SELECT id_mensalidade,m.nif_socio,DATE_FORMAT(data_vencimento,'%d-%m-%Y') AS data_vencimento,DATE_FORMAT(data_pagamento,'%d-%m-%Y') AS data_pagamento,valor,pago,data_update,mes,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.mes=? order by data_vencimento desc ;";
            let result = await pool.query(sql, [mes]);
            return { status: 200, data: result }
        } else {
            let sql = "SELECT id_mensalidade,m.nif_socio,DATE_FORMAT(data_vencimento,'%d-%m-%Y') AS data_vencimento,DATE_FORMAT(data_pagamento,'%d-%m-%Y') AS data_pagamento,valor,pago,data_update,mes,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio order by data_vencimento desc ;";
            let result = await pool.query(sql);
            return { status: 200, data: result }
        }
    } catch (error) {
        return { status: 500, data: error }
    }
}

//CRIA UMA NOVA MENSALIDADE
module.exports.addMensalidade = async function (mensalidade) {
    try {
        data = new Date(mensalidade.data_vencimento);
        mes = data.getMonth() + 1;
        if (mensalidade.data_pagamento == null || mensalidade.data_pagamento == '') {
            let sql = "INSERT into mensalidade(nif_socio,data_vencimento,data_pagamento,valor,mes) VALUES (?,?,?,?,?);";
            let result = await pool.query(sql, [mensalidade.nif_socio, mensalidade.data_vencimento, mensalidade.data_pagamento, mensalidade.valor, mes]);
            return { status: 200, data: result }
        } else {
            let sql = "INSERT into mensalidade(nif_socio,data_vencimento,valor,mes) VALUES (?,?,?,?);";
            let result = await pool.query(sql, [mensalidade.nif_socio, mensalidade.data_vencimento, mensalidade.valor, mes]);
            return { status: 200, data: result }
        }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

//EDITA UMA MENSALIDADE
module.exports.editMensa = async function (mensalidade) {
    try {
        let sql = "UPDATE mensalidade set data_pagamento =?, valor=?, pago=? where id_mensalidade=? ;"
        let result = await pool.query(sql, [mensalidade.data_pagamento, mensalidade.valor, mensalidade.pago, mensalidade.id_mensalidade]);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

//ELIMINAR UMA MENSALIDADE
module.exports.deletaMensalidade = async function (id_mensalidade) {
    try {
        let sql = "DELETE FROM mensalidade WHERE id_mensalidade= ?;";
        let result = await pool.query(sql, [id_mensalidade]);
        return { status: 200, data: result };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

//GERA O CALL NA BD
module.exports.callMensalidades = async function (dia, mes, ano) {
    try {
        let datastr = dia + " " + mes + " " + ano;
        let mydata = ano + "/" + mes + "/" + dia;
        let sql = "call cria_mensalidades2(?);";
        let result = await pool.query(sql, [datastr]);
        sql = "SELECT id_mensalidade,m.nif_socio,DATE_FORMAT(data_vencimento,'%d-%m-%Y') AS data_vencimento,DATE_FORMAT(data_pagamento,'%d-%m-%Y') AS data_pagamento,valor,pago,data_update,mes,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.data_vencimento=? order by data_vencimento desc ;";
        result = await pool.query(sql, [mydata]);
        return { status: 200, data: result }
    } catch (error) {
        return { status: 500, data: error }
    }
}