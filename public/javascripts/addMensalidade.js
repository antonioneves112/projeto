/*$(function (){
    $("#frm").validate({

        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({'padding-left':'10px','margin-right':'20px','padding-bottom':'2px'});
            error.addClass("arrow")
            error.insertAfter(element);
        },


        rules: {
            txtnif_socio: {   required: true, digits: true, minlength: 9 , maxlength:9 },
            txtdata_vencimento: {  required: true, minlength: 10 , maxlength:10 },
            txtdata_pagamento: {  required: true, minlength: 10 , maxlength:10},
            txtvalor: {  required: true, digits:true ,maxlength:3},
            txtestadopagamento: {  required: true},
          
        }
        ,
        messages: {
            txtnif_socio: {   required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos'},
            txtdata_vencimento: {  required:'Campo obrigatório', minlength:'Minimo dez caracteres'  , maxlength:'Máximo dez caracteres'},
            txtdata_pagamento: {  required:'Campo obrigatório', minlength:'Minimo dez caracteres'  , maxlength:'Máximo dez caracteres'},
            txtvalor: {  required:'Campo obrigatório', digits:'Insira apenas digitos' , maxlength:'Máximo 3 digitos'},
            txtestadopagamento: {  required:'Campo obrigatório', minlength:'Minimo três caracteres'},
          
            
        },
    });
});


*/






async function addMensalidade (mensalidade){
try {
    let mensalidade = {
        nif_socio: document.getElementById("txtnif_socio").value,
        data_vencimento: document.getElementById("txtdata_vencimento").value ,
        data_pagamento: document.getElementById("txtdata_pagamento").value,
        valor:document.getElementById("txtvalor").value,
        pago: document.getElementById("txtestadopagamento").value

    }
        console.log(mensalidade);

    let result = await $.ajax({
        url:'/mensalidades',
        method:'post',
        dataType: 'json',
        data:JSON.stringify(mensalidade),
        contentType:'application/json'
    });
    
} catch (error) {
    console.log(error);
}


}