
//---------------------------------------------------------------- ONLOAD ----------------------------------------------------------------------------------------
$(function () {
    loadSocios();
});

// -------------------------------------------------------------------------------  FIM ONLOAD ------------------------------------------------------------------------------
// ---------------- FUNÇÃO QUE CARREGA OS SÓCIOS DA ROTA ---------------------------------
async function loadSocios() {
    try {
        await $.ajax({
            url: '/socios',
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                showSocios(dados);
            }, error: function () {
                alert('erro no carregamento dos sócios');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// ---------------- FUNÇÃO QUE MOSTRA OS SÓCIOS VINDOS  DA ROTA ---------------------------------
function showSocios(socios) {
    try {
        let linha = $.map(socios, function (v, i) {
            return `<tr><td>${v.nif_socio}</td><td>${v.nome_socio}</td><td>${v.morada}</td><td>${v.telefone}</td><td>${delbutton(encodeURI(v.nif_socio))}</td><td><a href='./editSocio.html?id=${encodeURI(v.nif_socio)}'> UPDATE </a></td></tr>`
        })
        $("#result").append(linha);
    } catch (error) {
        console.log(error);

    }
}

// ---------------- FUNÇÃO ELIMINA O SÓCIO ATRAVÉS DO NIF_SÓCIO DO MESMO ---------------------------------

async function deletaSocio(nif_socio) {
    try {
        let confirma = confirm('Deseja realmente apagar Sócio ?');
        if (!confirma) return false;
        let result = await $.ajax({
            url: '/socios/' + nif_socio,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('sócio apagado com sucesso')
                var str = '#' + dados;
                $(str).closest('tr').remove();
            }, error: function () {
                alert('não foi possível apagar sócio');
            }
        });
    } catch (error) {
        console.log(error);
    }
}



function delbutton(nif) {
    return `<input type='button' id='${nif}' class='btnk' value='DEL' onclick='deletaSocio(${nif})' />`
}




