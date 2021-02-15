$(function () {

    $.ajax({
        url: '/turmas/aulamodalidade/',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            console.log(dados);
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.id_aula + "'> " + v.descricao + " </option>";
            });

            console.log(options);
            $("#selectaula").append(options);



        }, error: function (err) {
            console.log(err)
        }
    });


    $.ajax({
        url: '/turmas/socioaulas/',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            console.log(dados);
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.nif_socio + "'> " + v.nome_socio + " </option>";
            });

            console.log(options);
            $("#selectsocio").append(options);



        }, error: function (err) {
            console.log(err)
        }
    });





    $("#frm").validate({

        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({ 'padding-left': '10px', 'margin-right': '20px', 'padding-bottom': '2px' });
            error.addClass("arrow")
            error.insertAfter(element);
        },


        rules: {
            txtnif_socio: { required: true, digits: true, minlength: 9, maxlength: 9 },
            txtid_aula: { required: true, digits: true }
        }

        ,
        messages: {
            txtnif_socio: { required: 'Campo obrigatório', digits: 'Insira apenas digitos', minlength: 'Minimo 9 digitos', maxlength: 'Máximo 9 digitos' },
            txtid_aula: { required: 'Campo obrigatório', digits: 'Insira apenas digitos' }

        },

    });

    $("#btn").click(function (evt) {
        evt = evt ? evt : window.event;
        evt.preventDefault();
        if ($("#frm").valid()) {
            let turma = {
                nif_socio: document.getElementById('selectsocio').value,
                id_aula: document.getElementById('selectaula').value
            };
            $.ajax({
                url: "/turmas",
                method: "post",
                dataType: "json",
                data: JSON.stringify(turma),
                contentType: "application/json",
                success: function (dados) {
                    alert('sócio inserido na turma com sucesso !');
                    window.location.href = "./turmas.html";
                },
                error: function () {
                    alert('erro no registo ');
                }
            });
        }
        else {
            alert("Formulário Inválido");
        }

    });
});


