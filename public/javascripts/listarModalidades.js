//-----------------------------------------------------------------------------------  ONLOAD ------------------------------------------------------------------------------------------------
$(function () {
    loadModalidades();
});

//-----------------------------------------------------------------------------------  FIM ONLOAD ------------------------------------------------------------------------------------------------

async function loadModalidades() {
    try {
        let modalidades = await $.ajax({
            url: '/modalidades/',
            method: 'get',
            dataType: 'json',
            contentType: 'application/jason',
            success: function (dados) {
                showModalidades(dados);
            }, error: function () {
                alert('falha na listagem das modalidades');
            }
        });
    } catch (error) {
        console.log(error);
        let result = $('#result');
        result.html('<h2> Falha ao Carregar Modalidades </h2>')
    }
}

function showModalidades(modalidades) {
    try {
        let linhas = $.map(modalidades, function (v, i) {
            return `<tr><td>${v.id_modalidade}</td><td>${v.modalidade}</td><td>${delButton(encodeURI(v.id_modalidade))}</td></tr>`
        })
        $("#result").append(linhas);
    } catch (error) {
        console.log(error);
        let result = $('#result');
        result.html('<h2> Falha ao mostrar Modalidades </h2>')
    }

}

async function deletaModalidade(id_modalidade) {
    try {
        alert(id_modalidade)
        let confirma = confirm('Deseja realmente apagar modalidade?');
        if (!confirma) return false;
        await $.ajax({
            url: '/modalidades/' + id_modalidade,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('modalidade eliminada com sucesso');
                let str = '#' + dados;
                $(str).closest('tr').remove();
            }, error: function () {
                alert('erro na eliminação da modalidade');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function delButton(id_modalidade) {
    return `<input type='button' class='btnk' id='${id_modalidade}'  onclick='deletaModalidade(${id_modalidade})' value='DEL' />`
}