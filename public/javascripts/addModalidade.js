
//---------------------------------------------------------------- ONLOAD ----------------------------------------------------------------------------------------
$(function () {
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
                    nif_instrutor: document.getElementById('txtnif').value
                };
                $.ajax({
                    url: "/modalidades",
                    method: "post",
                    dataType: "json",
                    data: JSON.stringify(modalidade),
                    contentType: "application/json",
                    success: function (dados) {
                        alert('instrutor inserido com sucesso !');
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