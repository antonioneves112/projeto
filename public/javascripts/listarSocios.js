
//---------------------------------------------------------------- ONLOAD ----------------------------------------------------------------------------------------
$(function () {
    loadSocios();
});

// -------------------------------------------------------------------------------  FIM ONLOAD ------------------------------------------------------------------------------
// ---------------- FUNÇÃO QUE CARREGA OS SÓCIOS DA ROTA ---------------------------------
async function loadSocios() {
    try {
        let socios = await $.ajax({
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
        let linhas = '';
        let result = document.getElementById('result');
        for (let i of socios) {
            linhas += "<tr> <td> " + i.nif_socio + " </td> <td> " + i.nome_socio + " </td> <td> " +
                i.morada + " </td> <td>" + i.telefone + "</td> <td> <input type='button' class='btnk'   onclick='deletaSocio(" + encodeURI(i.nif_socio) + ")' value ='DEL' id='" + encodeURI(i.nif_socio) + "' /> </td> <td> <a href='./editSocio.html?id=" + encodeURI(i.nif_socio) + "'> UPDATE </a>  </td> </tr>";
        }
        result.innerHTML = linhas;
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