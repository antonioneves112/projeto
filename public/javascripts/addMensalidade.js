
//--------------------------------------------------------------------------------- ON LOAD --------------------------------------------------------------------------------------------
$(function () {
    submeterformulario();
    validarFormulario();
    preencheselectNif();

});

//---------------------------------------------------------------------------------  FIM ONLOAD ---------------------------------------------------------------------------------

function validarFormulario() {
    $("#frm").validate({
        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({ 'padding-left': '10px', 'margin-right': '20px', 'padding-bottom': '2px' });
            error.addClass("arrow")
            error.insertAfter(element);
        },
        rules: {
            selecttxtnif: { required: true, digits: true, minlength: 9, maxlength: 9 },
            txtdata_vencimento: { required: true },
            txtdata_pagamento: { required: true },
            txtvalor: { required: true, digits: true, maxlength: 3 }
        }
        ,
        messages: {
            selecttxtnif: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 digitos', maxlength: 'Máximo 9 digitos' },
            txtdata_vencimento: { required: 'Campo obrigatório' },
            txtdata_pagamento: { required: 'Campo obrigatório' },
            txtvalor: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', maxlength: 'Máximo 3 digitos' },
        },
    });

}

function submeterformulario() {
    try {
        $("#btn").click(function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            if ($("#frm").valid()) {
                let mensalidade = {
                    nif_socio: document.getElementById('selecttxtnif').value,
                    data_vencimento: document.getElementById('txtdata_vencimento').value,
                    data_pagamento: document.getElementById('txtdata_pagamento').value,
                    valor: document.getElementById('txtvalor').value,

                };
                $.ajax({
                    url: "/mensalidades/add/",
                    method: "post",
                    dataType: "json",
                    data: JSON.stringify(mensalidade),
                    contentType: "application/json",
                    success: function (dados) {
                        alert('mensalidade inserida com sucesso !');
                        window.location.href = "./listarMensalidades.html";
                    },
                    error: function () {
                        alert('erro no registo da modalidade !');
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

function preencheselectNif() {
    try {
        $.ajax({
            url: '/socios',
            method: 'get',
            contentType: 'json',
            success: function (dados) {
                let option = $.map(dados, function (v, i) {
                    return `<option value='${v.nif_socio}'> ${v.nome_socio} </option> `;
                });
                console.log(option);
                $('#selecttxtnif').append(option);

            }, error: function () {
                alert('erro no carregamento dos dados do sócio');
            }
        })
    } catch (error) {
        console.log(error);
    }
}
