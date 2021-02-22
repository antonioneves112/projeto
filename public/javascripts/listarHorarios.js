$(function () {
    loadHorarios();
  
})


async function loadHorarios() {
    try {
        await $.ajax({
            url: '/horarios/',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {

                showHorarios(dados);
            }, error: function () {
                alert('falha');
            }
        })
    } catch (error) {
        console.log(error);
    }
}


function showHorarios(dados) {
    let linha = '';
    let result = $("#result");
    let tabela = $.map(dados, function (v, i) {
        return " <tr> <td> " + v.id_horario + "</td><td> " + v.id_aula + "</td> <td> " + v.dia_semana + "</td><td> " + v.modalidade + "</td><td> " + v.inicio + "</td> <td> " + v.fim + "</td>  <td> " + btd(encodeURI(v.id_horario)) + " </td> </tr>"
    })
    result.append(tabela);
  

}




function btd(id_horario) {
    return "<input id='" + id_horario + "' type='button' class='btnk' value='DEL' onclick='deletarHorario(" + id_horario + ")' name='btdel' />"
}

async function deletarHorario(id_horario) {
    try {
        alert(id_horario);
        $.ajax({
            url: '/horarios/' + id_horario,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                let str = "#" + id_horario;
                $(str).closest("tr").remove();
            }, error: function () {
                alert('falha');
            }
        })
    } catch (error) {
        console.log(error);
    }

}