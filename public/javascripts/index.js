$(function () {
    getInstrutores();
})


function getInstrutores() {
    $.ajax({
        url: '/instrutores',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            let foto = $.map(dados, function (v, i) {
                return "<button class='btn-img-treinador' type='submit' onclick='instrutoresDetail("+encodeURI(v.nif)+")' >  <img class='img-aside-treinador' src='" + v.foto + "' alt='foto'> </button> <p> " + v.nome + "</p> "
            })
            $("#fotos").append(foto);
        }, error: function () {
            alert('erro ao carregar instrutores');
        }
    })
}


function instrutoresDetail(nif) {
    return window.location.href= "./instrutorPrincipal.html?id="+nif+"";
}


