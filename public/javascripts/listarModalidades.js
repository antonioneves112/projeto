
//-----------------------------------------------------------------------------------  ONLOAD ------------------------------------------------------------------------------------------------
$(function () {
    loadModalidades();
});

//-----------------------------------------------------------------------------------  FIM ONLOAD ------------------------------------------------------------------------------------------------

async function loadModalidades() {
    try {
        let modalidades = await $.ajax({
            url: '/modalidades/ins',
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
        let linhas = '';
        let result = document.getElementById('result');
        for (let i of modalidades) {
            linhas += "<tr> <td> " + i.id_modalidade + "<td>" + i.modalidade + "</td> " + "<td> " + i.nome + " </td>" +
                "<td> <input type='button' class='btnk'  id='" + encodeURI(i.id_modalidade) + "'     onclick='deletaModalidade(" + encodeURI(i.id_modalidade) + ")'  value='DEL'  /> </td>  </tr> ";
        }
        result.innerHTML = linhas;
    } catch (error) {
        console.log(error);
        let result = $('#result');
        result.html('<h2> Falha ao mostrar Modalidades </h2>')
    }

}

async function deletaModalidade(id_modalidade) {
    try {
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