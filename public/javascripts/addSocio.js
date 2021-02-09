// =================================== JAVASCRIPT CLIENTE PARA ADICIONAR SOCIO ================================================================================
$(function (){
    $("#frm").validate({

        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({'padding-left':'10px','margin-right':'20px','padding-bottom':'2px'});
            error.addClass("arrow")
            error.insertAfter(element);
        },


        rules: {
            txtnif_socio: {  required: true, digits: true, minlength: 9 , maxlength:9},
            txtnome_socio: {  required: true,  minlength: 3 },
            txtmorada: {  required: true , minlength: 5  },
            txtemail: {  required: true,  email:true },
            txttelefone: {  required: true,  digits:true, minlenght: 9 , maxlength:9 },
          
        }
        
        ,
        messages: {
            txtnif_socio: {  required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos'},
            txtnome_socio: {  required:'Campo obrigatório', minlength:'Campo deve conter mais de dois caracteres'},
            txtmorada: {  required:'Campo obrigatório', minlength:'Campo deve conter mais de cinco  caracteres'},
            txtemail: {  required:'Campo obrigatório',  email:'coloque um endereço de email válido '},
            txttelefone: {  required:'Campo obrigatório',  digits:'insira apenas digitos' , minlenght:'Mínimo 9 digitos', maxlength: 'Máximo 9 digitos' },
            
        },
    });
});


async function addSocio(socio){
    try {
        let socio = {
            nif_socio : document.getElementById('txtnif_socio').value,
            nome_socio : document.getElementById('txtnome_socio').value,
            morada : document.getElementById('txtmorada').value,
            email : document.getElementById('txtemail').value,
            telefone : document.getElementById('txttelefone').value,
            nib : document.getElementById('txtnib').value
        }
       // alert(JSON.stringify(socio));
        let result = await $.ajax({
            url:"/socios",
            method:"post",
            dataType:"json",
            data: JSON.stringify(socio),
            contentType : "application/json"
        });
        alert(JSON.stringify(result));
    }
     catch (error) {
         console.log(error);
        
    }
}

