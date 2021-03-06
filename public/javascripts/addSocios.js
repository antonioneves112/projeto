
//------------------------------------------------------------- ON LOAD ------------------------------------------------------------------
$(function () {
    validarFomulario();
    submeterFormulario();

});

//------------------------------------------------------------- FIM ONLOAD -------------------------------------------------------------------
//FUNÇÃO QUE VALIDA OS CAMPOS DO FORMULÁRIO   ADAPTADO DE : https://jqueryvalidation.org/validate/ 
function validarFomulario() {
    $("#frm").validate({
        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({ 'padding-left': '10px', 'margin-right': '20px', 'padding-bottom': '2px' });
            error.addClass("arrow")
            error.insertAfter(element);
        },
        rules: {
            txtnif_socio: { required: true, digits: true, minlength: 9, maxlength: 9 },
            txtnome_socio: { required: true, minlength: 3 },
            txtmorada: { required: true, minlength: 5 },
            txtemail: { required: true, email: true },
            txttelefone: { required: true, digits: true }
        }
        ,
        messages: {
            txtnif_socio: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
            txtnome_socio: { required: 'Campo obrigatório', minlength: 'Campo deve conter mais de dois caracteres' },
            txtmorada: { required: 'Campo obrigatório', minlength: 'Campo deve conter mais de cinco  caracteres' },
            txtemail: { required: 'Campo obrigatório', email: 'coloque um endereço de email válido ' },
            txttelefone: { required: 'Campo obrigatório', digits: 'insira apenas digitos' },
        },
    });
}

function submeterFormulario() {
    $("#btn").click(function (evt) {
        evt = evt ? evt : window.event;
        evt.preventDefault();
        if ($("#frm").valid()) {
            let socio = {
                nif_socio: document.getElementById('txtnif_socio').value,
                nome_socio: document.getElementById('txtnome_socio').value,
                morada: document.getElementById('txtmorada').value,
                email: document.getElementById('txtemail').value,
                telefone: document.getElementById('txttelefone').value,
                nib: document.getElementById('txtnib').value
            };
            $.ajax({
                url: "/socios",
                method: "post",
                dataType: "json",
                data: JSON.stringify(socio),
                contentType: "application/json",
                success: function (dados) {
                    alert('Sócio inserido com sucesso !');
                    window.location.href = "./listarSocios.html";
                },
                error: function () {
                    alert('erro no registo do sócio');
                }
            });
        }
        else {
            alert("Formulário Inválido");
        }

    });
}