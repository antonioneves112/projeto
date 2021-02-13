
function getTurma(nif) {

    try {
        let socios = $.ajax({
            url: '/socios/turmas/' + nif,
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

    function showTurma(socios) {
        let result = document.getElementById('result');
        let linhas = ""
        for (let socio of socios) {
            linhas += "<tr> <td> " + socio.nif_socio + " </td> <td> " + socio.divida + "</td> <td> " + socio.nome_socio + " </td> <td> " +
                socio.morada + " </td> <td>" + socio.telefone + "</td><td> <input type='button'   onclick='deletaSocio(" + encodeURI(socio.nif_socio) + ")' value ='DEL' id='" + encodeURI(socio.nif_socio) + "' /> </td> <td> <a href='./editSocio.html?id=" + encodeURI(socio.nif_socio) + "'> UPDATE </a>  </td> </tr>";
        }
        result.innerHTML = linhas;
        $("tr").filter(function () {
            return $(this).find('td:eq(1)').text() == 1;
        }).css('background-color', 'rgba(247,33,25,0.5');
    }


}