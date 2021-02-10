window.onload = function () {

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
            txttelefone: {  required: true, digits: true, minlength: 9, maxlength: 9 },


        }
        ,
        messages: {
            txtnif_socio: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
            txtnome_socio: { required: 'Campo obrigatório', minlength: 'Minimo 5 caracteres' },
            txtmorada: { required: 'Campo obrigatório', minlength: 'Minimo 5 caracteres'},
            txtemail: { required: 'Campo obrigatório', email: 'coloque um endereço de email válido ' },
            txttelefone: {  required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
        },

    });


    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');

   
    $.ajax({
        url: "/socios/" + myParam,
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            
            document.getElementById('txtnif_socio').value = dados[0].nif_socio;
            document.getElementById('txtnome_socio').value = dados[0].nome_socio;
            document.getElementById('txtmorada').value =dados[0].morada;
            document.getElementById('txtemail').value =dados[0].email;
            document.getElementById('txttelefone').value = dados[0].telefone;
            document.getElementById('txtnib').value = dados[0].nib;


        }, error: function () {
            alert('error');
        }
    })



}


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
