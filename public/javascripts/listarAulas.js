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
        linhas = $.map(dados, function (v, i) {
            return `<tr><td>${v.id_aula}</td><td>${v.nome}</td><td>${delButton(encodeURI(v.id_aula))}</td></tr>`
        })
        $("#result").append(linhas);
    } catch (error) {
        console.log(error);
    }
}

async function apagaAula(id) {
    try {
        let confirma = confirm('Deseja realmente apagar aula?');
        if (!confirma) return false;
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
        str = "#" + id;
        $(str).closest("tr").remove();
    } catch (error) {
        console.log(error);
    }

}

function delButton(id) {
    return `<input type='button' class='btnk' id='${id}' onclick='apagaAula(${id})' value='DEL' /> `
}
