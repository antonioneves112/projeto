$(function (){
    $("#frm").validate({

        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({'padding-left':'10px','margin-right':'20px','padding-bottom':'2px'});
            error.addClass("arrow")
            error.insertAfter(element);
        },


        rules: {
            txtnif: {  required: true, digits: true, minlength: 9 , maxlength:9},
            txtnome: {  required: true,  minlength: 3 },
            txtcontacto: {  required: true , digits: true, minlength: 9 , maxlength:9 },
            txtemail: {  required: true,  email:true },
            
          
        }
        
        ,
        messages: {
            txtnif: {  required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos'},
            txtnome: {  required:'Campo obrigatório', minlength:'Campo deve conter mais de dois caracteres'},
            txtcontacto: {  required:'Campo obrigatório' , digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos'},
            txtemail: {  required:'Campo obrigatório',  email:'coloque um endereço de email válido '},
           
            
        },
    });
});








async function addInstrutor(instrutor){
    try {
        let instrutor = {  
            nif : document.getElementById('txtnif').value,
            nome :document.getElementById('txtnome').value,
            contacto : document.getElementById('txtcontacto').value,
            email :document.getElementById('txtemail').value

        }

        let result = await $. ajax({
            url:"/instrutores",
            method:"post",
            dataType:"json",
            data:JSON.stringify(instrutor),
            contentType:'application/json'
        });
       
    } catch (error) {
        console.log(error);
    }

}