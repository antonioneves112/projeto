var pool = require('./connectBd');

//CONSULTA NA BASE DE DAODS E RETORNA UM OBJETO COM OS VALORES DA CONSULTA
module.exports.getMensalidades = async function () {
    try {
        let sql = "select m.*,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio order by data_vencimento desc;";
        let result = await pool.query(sql);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        return { status: 500, data: error }
    }

}





module.exports.getFiltroMensalidadeNome = async function (nif) {
    try {

        let sql = "select m.*,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.nif_socio=? order by data_vencimento desc ;";
        let result = await pool.query(sql, [nif]);
        console.log(nif);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        console.log('erro no filtro');
        return { status: 500, data: error }
    }

}



module.exports.getFiltroMensalidadePago = async function (pago) {
    try {

        let sql = "select m.*,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.pago=? order by data_vencimento desc ;";
        let result = await pool.query(sql, [pago]);
        console.log(pago);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        console.log('erro no filtro');
        return { status: 500, data: error }
    }

}





module.exports.criamensalidades = async function (data_vence) {
    try {
        console.log(data_vence);
        let sql = "call cria_mensalidades(?);";
        let result = await pool.query(sql, [data_vence]);
        sql = "select m.*,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.data_vencimento=? order by data_vencimento desc ;";
        result = await pool.query(sql, [data_vence]);
        console.log(data_vence);
        console.log(result);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        console.log('erro no filtro');
        return { status: 500, data: error }
    }

}







module.exports.getFiltroMensalidadeMes = async function (mes) {
    try {

        let sql = "select m.*,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio WHERE m.mes=? order by data_vencimento desc ;";
        let result = await pool.query(sql, [mes]);
        console.log(mes);
        console.log(result);
        return { status: 200, data: result }
    } catch (error) {
        console.log(error);
        console.log('erro no filtro');
        return { status: 500, data: error }
    }

}




//CRIA UMA NOVA MENSALIDADE
module.exports.addMensalidade = async function (mensalidade) {
    try {

        console.log(mensalidade.data_pagamento);
        if (mensalidade.data_pagamento == null || mensalidade.data_pagamento == '') {
            let sql = "insert into mensalidade(nif_socio,data_vencimento,valor) VALUES (?,?,?);";
            let result = await pool.query(sql, [mensalidade.nif_socio, mensalidade.data_vencimento, mensalidade.valor]);
            return { status: 200, data: result }
        } else {
            let sql = "insert into mensalidade(nif_socio,data_vencimento,data_pagamento,valor) VALUES (?,?,?,?);";
            let result = await pool.query(sql, [mensalidade.nif_socio, mensalidade.data_vencimento, mensalidade.data_pagamento, mensalidade.valor]);
            return { status: 200, data: result }
        }

    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }

}

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


module.exports.editMensa = async function (mensalidade) {
    console.log(mensalidade);
    try {
        let sql = "update mensalidade set data_pagamento =?, valor=?, pago=? where id_mensalidade=? ;"
        let result = await pool.query(sql, [mensalidade.data_pagamento, mensalidade.valor, mensalidade.pago, mensalidade.id_mensalidade]);




        
        console.log("xxxxxxxxxxxxxx");
        console.log(result)
        return { status: 200, data: result };

    } catch (error) {
        console.log(error);
        return { status: 500, data: error };

    }
}

