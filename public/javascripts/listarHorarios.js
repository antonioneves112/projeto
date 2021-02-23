$(function () {

    carregaSelect();
    loadHorarios();
    filtroSemana();

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
    let linhas = $.map(dados, function (v, i) {
        return `<tr><td >${v.id_horario}</td><td id='aula'>${v.id_aula}</td><td>${v.dia_semana}</td><td>${v.modalidade}</td><td>${v.inicio}</td><td>${v.fim}</td><td>${btd(encodeURI(v.id_horario))}</td><<</tr>`
    })
    result.append(linhas);

    /* $("#result").find('tr').each(function () {
         let cor = $(this).find('td:eq(1)').text();
 
         $(this).css("background-color", "rgba(" + cor + ", " + 125 + ", " + 30 + ", 1)");
     });
 */
}

function btd(id_horario) {
    return "<input id='" + id_horario + "' type='button' class='btnk' value='DEL' onclick='deletarHorario(" + id_horario + ")' name='btdel' />"
}

async function deletarHorario(id_horario) {
    try {
        let confirma = confirm('Deseja realmente apagar Horário ?');
        if (!confirma) return false;
        $.ajax({
            url: '/horarios/' + id_horario,
            method: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('Horário eliminado com sucesso ');
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


async function carregaSelect() {
    try {
        await $.ajax({
            url: '/horarios/select/',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                let select = $.map(dados, function (v, i) {
                    return `<option value='${v.dia_semana}'> ${v.dia_semana} </option>`
                })
                $("#selectsemana").append(select);
            }, error: function () {
                alert('error');
            }
        })
    } catch (error) {

    }
}

async function filtroSemana(semana) {
    try {
        $('#selectsemana').change(async function (evt) {
            evt = evt ? evt : window.event;
            let semana = $(evt.target).val();
            let rota = (semana == -1) ? '/horarios/' : '/horarios/filtro/' + semana;
            semana = JSON.stringify(semana);
            alert(semana);
            $("#result").html('');
            // $('#selectfiltroinstrutor option').eq(0).prop('selected', true);
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
                    showHorarios(dados);
                }, error: function () {
                    alert('erro na execução do filtro');
                }
            })
        });

    } catch (error) {
        console.log(error);
    }
}