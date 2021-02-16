
// ------------------------------------------------------------------------------ ONLOAD ---------------------------------------------------------------------------------------
$(function () {
    loadInstrutores();
});
// ------------------------------------------------------------------------------ FIM DO ONLOAD ---------------------------------------------------------------------------------------
async function loadInstrutores() {
    try {
        let instrutores = await $.ajax({
            url: '/instrutores',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                showInstrutores(dados);
            }, error: function () {
                alert('não foi possível carregar os instrutores');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function showInstrutores(instrutores) {
    let linhas = '';
    let result = document.getElementById('result');
    for (let i of instrutores) {
        linhas += "<tr> <td> " + i.nif + " </td> <td> " + i.nome + " </td> <td> " +
            i.contacto + " </td> <td>" + i.email + "</td><td>" + i.modalidade + "</td> <td> <input type='button' class='btnk'   onclick='deletaInstrutor(" + encodeURI(i.nif) + ")' value ='DEL' id='" + encodeURI(i.nif) + "' /> </td> <td> <a href='./editInstrutor.html?id=" + encodeURI(i.nif) + "'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}

async function deletaInstrutor(nif) {
    try {
        let confirma = confirm('Deseja realmente apagar instrutor ?');
        if (!confirma) return false;
        let result = await $.ajax({
            url: '/instrutores/' + nif,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('instrutor eliminado com sucesso');
                str = '#' + dados;
                $(str).closest('tr').remove();
            }, error: function () {
                alert('não foi possível apagar instrutor');
            }
        });
    } catch (error) {
        console.log(error);
    }
}