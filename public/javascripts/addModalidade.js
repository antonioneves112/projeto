
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
         
        }
        ,
        messages: {
            txtnomeModalidade: { required: 'Campo obrigatório', minlength: 'Campo deve conter mais de dois caracteres' }
           
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
                    modalidade: $("#txtnomeModalidade").val()
                    
                }
                console.log(modalidade);
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