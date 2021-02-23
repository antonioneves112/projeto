
$(function () {
    loadHorario();
    getTurma();
});

async function getTurma(nif) {
    try {
        $("#alunos").show();
        $("#horarios").show();
        $("#esconde").show();

        $("#resulth").text(" ");

        let socios = await $.ajax({
            url: '/socios/home/' + nif,
            method: 'get',
            datatype: 'json',
            success: function (socios) {
                showTurma(socios);

            }, error: function () {
            }
        });

        $.ajax({
            url: '/horarios/home/' + nif,
            method: 'get',
            datatype: 'json',
            contentType: 'application/json',
            success: function (dados) {
                let aux = $.map(dados, function (v, i) {
                    return `<tr><td>${v.id_aula}</td><td>${v.dia_semana}</td> <td>${v.inicio}</td><td>${v.fim}</td><td>${v.modalidade}</td></tr>`
                })
                $("#resulth").append(aux);
            }, error: function () {
                alert('falha');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function showTurma(socios) {
    try {
        $("#result").html('');
        let linhas = $.map(socios, function (v, i) {
            return `<tr><td>${v.nome_socio}</td></tr>`
        })
        $("#result").append(linhas);
        $("tr").css('background-color', 'rgba(70,102,255,0.5');
    } catch (error) {
        alert('falha no carregamento dos sócios');
    }

}

