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
    let lista = $.map(instrutores, function (v, i) {
        return `<tr><td>${v.nif}</td><td>${v.nome}</td><td>${v.contacto}</td><td>${v.email}</td><td>${v.modalidade}</td><td>${delButton(encodeURI(v.nif))}</td><td><a href='./editInstrutor.html?id=${encodeURI(v.nif)}'> UPDATE</a> </td><tr>`
    })
    $("#result").append(lista);
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

function delButton(nif) {
    return `<input type='button' class='btnk' value='DEL' id='${nif}' onclick='delins(${nif})' />`
}