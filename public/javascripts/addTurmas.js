

//---------------------------------------------------------------------------     ONLOAD  ------------------------------------------------------------------------------------------
$(function () {
    preencheSelectIdAula();
    preencheSelectNifSocio();
    submeterFormulario();
});



//--------------------------------------------------------------------------    FIM ONLOAD  -------------------------------------------------------------------------------------------

async function preencheSelectNifSocio() {
    await $.ajax({
        url: '/socios/',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            console.log(dados);
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.nif_socio + "'> " + v.nome_socio + " </option>";
            });
            $("#selectsocio").append(options);
        }, error: function (err) {
            console.log(err)
        }
    });
}

async function preencheSelectIdAula() {
    await $.ajax({
        url: '/turmas/selectidAula/',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.id_aula + "'> " + v.modalidade + " </option>";
            });
            $("#selectaula").append(options);
        }, error: function (err) {
            console.log(err)
        }
    });

}



async function submeterFormulario() {
    try {
        $("#btn").click(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            let turma = {
                nif_socio: document.getElementById('selectsocio').value,
                id_aula: document.getElementById('selectaula').value
            };
            await $.ajax({
                url: "/turmas",
                method: "post",
                dataType: "json",
                data: JSON.stringify(turma),
                contentType: "application/json",
                success: function (dados) {
                    alert('sócio inserido na turma com sucesso !');
                    window.location.href = "./listagemAlunoTurmas.html";
                },
                error: function () {
                    alert('erro no registo ');
                }
            });
        });
    } catch (error) {

    }
}

