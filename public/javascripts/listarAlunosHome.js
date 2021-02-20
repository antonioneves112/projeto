

//--------------------------------
$(function () {
    getTurma();
});

async function getTurma(nif) {
    try {
        let socios = await $.ajax({
            url: '/socios/home/' + nif,
            method: 'get',
            datatype: 'json',
            success: function (socios) {
                showTurma(socios);
            }, error: function () {
            }
        });
    } catch (error) {
        console.log(error);
    }
}


function showTurma(socios) {
    try {
        let result = document.getElementById('result');
        let linhas = ""
        for (let socio of socios) {
            linhas += "<tr><td>" + socio.nome_socio + "</td></tr>";
        }
        result.innerHTML = linhas;
        $("tr").css('background-color', 'rgba(70,102,255,0.5');

    } catch (error) {
        alert('falha no carregamento dos sócios');
    }

}



