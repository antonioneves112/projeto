//--------------------------------------------------------------- ONLOAD ----------------------------------------------------------------------------------------

// ---------------- FUNÇÃO QUE VALIDA OS CAMPOS DO FORMULÁRIO   ADAPTADO DE : https://jqueryvalidation.org/validate/  ---------------------------------
$(function () {


    preencherFormulario();
    validarFormulario();
    submeterFormulario();





})

function preencherFormulario() {
    try {
        // -----------------------------  Através do URLSearchParams conseguimos retornar o id que vem do Listarsócio para o Edit Sócio 
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        $.ajax({
            url: "/socios/" + myParam,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                $("#txtnif_socio").val(dados[0].nif_socio);
                $("#txtnome_socio").val(dados[0].nome_socio);
                $("#txtmorada").val(dados[0].morada);
                $("#txtemail").val(dados[0].email);
                $("#txttelefone").val(dados[0].telefone);
                $("#txtnib").val(dados[0].nib);
            }, error: function () {
                alert('error');
            }
        })
    } catch (error) {
        console.log(error);
    }
}


function validarFormulario() {
    try {
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
                txttelefone: { required: true, digits: true, minlength: 9, maxlength: 9 },
            }
            ,
            messages: {
                txtnif_socio: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
                txtnome_socio: { required: 'Campo obrigatório', minlength: 'Minimo 5 caracteres' },
                txtmorada: { required: 'Campo obrigatório', minlength: 'Minimo 5 caracteres' },
                txtemail: { required: 'Campo obrigatório', email: 'coloque um endereço de email válido ' },
                txttelefone: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
            },
        });

    } catch (error) {
        console.log(error);
    }
}

function submeterFormulario() {
    $("#btn").click(function (evt) {
        evt = evt ? evt : window.event;
        evt.preventDefault();
        if ($("#frm").valid()) {
            let socio = {
                nif_socio: $("#txtnif_socio").val(),
                nome_socio: $("#txtnome_socio").val(),
                morada: $("#txtmorada").val(),
                email: $("#txtemail").val(),
                telefone: $("#txttelefone").val(),
                nib: $("#txtnib").val()

            }
            console.log(socio);
            $.ajax({
                url: "/socios",
                method: "put",
                dataType: "json",
                data: JSON.stringify(socio),
                contentType: "application/json",
                success: function (dados) {
                    alert('sócio editado com sucesso !');
                    window.location.href = "./listarSocios.html";
                },
                error: function () {
                    alert('erro na edicao do sócio');
                }
            });
        }
        else {
            alert("Formulário Inválido");
        }
    });
}

