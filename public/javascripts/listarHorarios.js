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
    pos = 0;
    let tabela = $.map(dados, function (v, i) {
        pos++;
        return " <tr> <td> " + v.id_aula + "</td> <td> " + v.dia_semana + "</td><td> " + v.inicio + "</td> <td> " + v.fim + "</td>  <td> " + btd(encodeURI(v.id_aula), encodeURI(pos), encodeURI(v.dia_semana)) + " </td> </tr>"
    })
    result.append(tabela);
}

function btd(id_aula, pos, dia_semana) {

    let myid = pos + 'del'
    return "<input type='submit' id='" + myid + "'  class='btnk' value='DEL' onclick='deletarHorario(" + id_aula + "," + pos + "," + dia_semana + "," + ")' name='btd' >"
}

async function deletarHorario(id_aula, dia_semana) {
    try {
        alert(id_aula);
        $.ajax({
            url: '/horarios/',
            method: 'delete',
            dataType: 'json',
            data: {
                id_aula: id_aula,
                dia_semana: dia_semana
            },

            contentType: 'application/json',
            success: function (dados) {
                alert('sucesso');
            }, error: function () {
                alert('falha');
            }
        })
    } catch (error) {
        console.log(error);
    }

}