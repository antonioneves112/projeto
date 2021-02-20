$(function () {
    preenchenifAula();
    submeterFormulario();
});


async function preenchenifAula() {
    try {
        await $.ajax({
            url: '/instrutores',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                option = $.map(dados, function (v, i) {
                    return "<option value='" + v.nif + "' > " + v.nome + " </option>"
                })
                $('#selectnif').append(option);
            }, error: function () {
                alert('error');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function submeterFormulario() {
    try {
        $('#btn').click(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            let aulas = {
                nif_instrutor: document.getElementById('selectnif').value
            }

            await $.ajax({
                url: '/aulas/',
                method: 'post',
                dataType: 'json',
                data: JSON.stringify(aulas),
                contentType: 'application/json',
                success: function (dados) {
                    alert('Aula criada com sucesso');
                    window.location.href = './listaAulas.html';

                }, error: function () {
                    alert('erro no registo da aula');
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}
