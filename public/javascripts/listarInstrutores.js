$(function () {
    loadInstrutores();
});



async function loadInstrutores() {
    try {
        let instrutores = await $.ajax({
            url: '/instrutores/',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                console.log(dados);
                showInstrutores(dados);
            }, error() {
                alert('erro no carregamento dos instrutores');

            }
        });
    } catch (error) {

    }
}


function showInstrutores(instrutores) {
    try {
        let result = document.getElementById('result');
        html = '';
        for (let i of instrutores) {
            html += "<tr>  <td> " + i.nif + " </td><td> " + i.nome + " </td><td> " + i.contacto + " </td><td> " + i.email + " </td><td> " + i.modalidade + " </td> " +
                "<td><input type='submit' value='DEL' id='" + encodeURI(i.nif) + "' class='btnk' onclick='delins(" + encodeURI(i.nif) + ")' ></td><td><a href='./editInstrutor.html?id=" + encodeURI(i.nif) + "'> UPDATE </td></tr>"
        }
        result.innerHTML = html;

    } catch (error) {

    }
}


async function delins(nif) {
    try {
        let confirma = confirm('deseja realmente apagar instrutor ?');
        if (!confirma) return false;
        myID = nif;
        await $.ajax({
            url: '/instrutores/' + nif,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('instrutor apagado com sucesso');
            }, error: function () {
                alert('erro ao eliminar instrutor');
            }

        });
        str = "#" + myID;
        $(str).closest("tr").remove();
    } catch (error) {
        console.log(error);
    }
}
