$(function () {
    preencheaula();
    submeterFormulario();


});


async function preencheaula() {
    try {

        await $.ajax({
            url: '/aulas/horarios/',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                console.log(dados);
                select = $.map(dados, function (v, i) {
                    return "<option value='" + v.id_aula + "'>" + v.modalidade + " </option>"
                })
                $('#selectaula').append(select);

            }, error: function () {
                alert('error');
            }
        })
    } catch (error) {
        console.log(error);
    }
}


async function submeterFormulario() {
    try {
        $("#btn").click(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();

            let horario = {
                id_aula: $("#selectaula").val(),
                dia_semana: $("#seldia").val(),
                inicio: $("#txtinicio").val(),
                fim: $("#txtfim").val()
            }
            console.log(horario);
            await $.ajax({
                url: '/horarios/',
                method: 'post',
                dataType: 'json',
                data: JSON.stringify(horario),
                contentType: 'application/json',
                success: function (dados) {
                    console.log(dados);
                    alert('novo horário inserido com sucesso ');
                    window.location.href = './listarHorarios.html';

                }, error: function () {
                    alert('falha na inserção de novo horário');
                }
            })
        });



    } catch (error) {
        console.log(error);
    }
}