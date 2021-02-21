
//---------------------------------------------------------------- ONLOAD ----------------------------------------------------------------------------------------
$(function () {
    preencheNifInstrutor();
    validarFormulario();
    submeterFormulario();

});
// -------------------------------------------------------------------------------  FIM ONLOAD ------------------------------------------------------------------------------

function validarFormulario() {
    $("#frm").validate({
        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({ 'padding-left': '10px', 'margin-right': '20px', 'padding-bottom': '2px' });
            error.addClass("arrow")
            error.insertAfter(element);
        },
        rules: {
            txtnomeModalidade: { required: true, minlength: 3 },
            txtnif: { required: true, digits: true, minlength: 9, maxlength: 9 }
        }
        ,
        messages: {
            txtnomeModalidade: { required: 'Campo obrigatório', minlength: 'Campo deve conter mais de dois caracteres' },
            txtnif: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
        },
    });
}

function submeterFormulario() {
    try {
        $("#btn").click(function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            if ($("#frm").valid()) {
                let modalidade = {
                    modalidade: document.getElementById('txtnomeModalidade').value,
                    nif_instrutor: document.getElementById('selnif').value
                };
                $.ajax({
                    url: "/modalidades",
                    method: "post",
                    dataType: "json",
                    data: JSON.stringify(modalidade),
                    contentType: "application/json",
                    success: function (dados) {
                        alert('modalidade inserida com sucesso !');
                        window.location.href = "./listarModalidades.html";
                    },
                    error: function () {
                        alert('erro no registo do instrutor');
                    }
                });
            }
            else {
                alert("Formulário Inválido");
            }
        });
    } catch (error) {
        console.log(error)
    }
}

function preencheNifInstrutor() {
    try {
        $.ajax({
            url: '/instrutores',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                alert('sucesso');
                option = $.map(dados, function (v, i) {
                    return "<option value='" + v.nif + "' > " + v.nome + " </option>";
                })
                $('#selnif').append(option);
            }, error: function () {
                alert('erro ao carregar nif instrutor');
            }
        })
    } catch (error) {

    }
}