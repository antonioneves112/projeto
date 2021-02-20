$(function () {
    loadAulas();

});



async function loadAulas() {
    try {
        $.ajax({
            url: '/aulas',
            method: 'get',
            contentType: 'json',
            success: function (dados) {
                console.log(dados);
                showAulas(dados);
            }, error: function () {
                alert('erro ao carregar as aulas');
            }
        })
    } catch (error) {
        console.log(error);
    }
}


function showAulas(dados) {
    try {
        let linhas = '';
        let result = document.getElementById('result');
        for (let i of dados) {
            linhas += "<tr> <td>" + i.id_aula + "</td><td>" + i.nif_instrutor + "</td><td>" + i.nome + "</td><td><input type='button' id='" + encodeURI(i.id_aula) + "' class='btnk' onclick='apagaAula(" + encodeURI(i.id_aula) + ")' value='DEL'</td></tr>"
        }
        result.innerHTML = linhas;

    } catch (error) {
        console.log(error);
    }
}


async function apagaAula(id) {
    try {
        let confirma = confirm('Deseja realmente apagar aula?');
        if (!confirma) return false;

        myid = id;
        $.ajax({
            url: '/aulas/' + id,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('Aula eliminada com sucesso');


            }, error: function () {
                alert('Falha na eliminação da aula');
            }
        })
        
        str = "#" + myid;
        $(str).closest("tr").remove();

    } catch (error) {
        console.log(error);
    }

}

