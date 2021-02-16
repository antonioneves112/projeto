
//--------------------------------------------------------------------------------  ONLOAD ------------------------------------------------------------------

$(function () {
    validarFormulario();
    insereDadosNoFormulario();
    preencheSelectModalidades();
    submeterFormulario();
});
//--------------------------------------------------------------------------------  ONLOAD ------------------------------------------------------------------


function preencheSelectModalidades() {
    try {
        $.ajax({
            url: '/modalidades',
            method: 'get',
            dataType: 'json',
            contentType: 'application/jason',
            success: function (dados) {
                let options = $.map(dados, function (v, i) {
                    return `<option value='${v.id_modalidade}'> ${v.modalidade} </option>`;
                });
                console.log(options);
                $('#selectmodalidade').append(options);

            }, error: function () {
                alert('erro ao carregar modalidade');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function validarFormulario() {
    $("#frm").validate({
        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({ 'padding-left': '10px', 'margin-right': '20px', 'padding-bottom': '2px' });
            error.addClass("arrow")
            error.insertAfter(element);
        },
        rules: {
            txtnif: { required: true, digits: true, minlength: 9, maxlength: 9 },
            txtnome: { required: true, minlength: 3 },
            txtcontacto: { required: true, digits: true, minlength: 9, maxlength: 9 },
            txtemail: { required: true, email: true }
        }
        ,
        messages: {
            txtnif: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
            txtnome: { required: 'Campo obrigatório', minlength: 'Campo deve conter mais de dois caracteres' },
            txtcontacto: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
            txtemail: { required: 'Campo obrigatório', email: 'coloque um endereço de email válido ' }
        },
    });
}

function insereDadosNoFormulario(myParam) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        $.ajax({
            url: '/instrutores/' + myParam,
            method: 'get',
            dataType: 'json',
            contentType: 'application/jason',
            success: function (dados) {
                document.getElementById('txtnif').value = dados.instrutor.data[0].nif;
                document.getElementById('txtnome').value = dados.instrutor.data[0].nome;
                document.getElementById('txtcontacto').value = dados.instrutor.data[0].contacto;
                document.getElementById('txtemail').value = dados.instrutor.data[0].email;
                document.getElementById('selectmodalidade').value = dados.instrutor.data[0].id_modalidade;
            }, error: function () {
                alert('falha na inserção dos dados no formulário');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function submeterFormulario() {
    try {
        $("#btn").click(function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            if ($("#frm").valid()) {

                let instrutor = {
                    nif: document.getElementById('txtnif').value,
                    nome: document.getElementById('txtnome').value,
                    contacto: document.getElementById('txtcontacto').value,
                    email: document.getElementById('txtemail').value,
                    id_modalidade: document.getElementById('selectmodalidade').value,
                };
                $.ajax({
                    url: "/instrutores",
                    method: "put",
                    dataType: "json",
                    data: JSON.stringify(instrutor),
                    contentType: "application/json",
                    success: function (dados) {
                        alert('instrutor editado com sucesso !');
                        window.location.href = "./listarInstrutores.html";
                    },
                    error: function () {
                        alert('erro na edicao do instrutor');
                    }
                });
            }
            else {
                alert("Formulário Inválido");
            }
        });
    } catch (error) {
        console.log(error);
    }
}





