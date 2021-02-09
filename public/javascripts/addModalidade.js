$(function (){
    $("#frm").validate({

        wrapper: 'span',
        errorPlacement: function (error, element) {
            error.css({'padding-left':'10px','margin-right':'20px','padding-bottom':'2px'});
            error.addClass("arrow")
            error.insertAfter(element);
        },


        rules: {
            txtnomeModalidade: {  required: true, minlength: 3 },
          
        }
        ,
        messages: {
            txtnomeModalidade: {  required:'Campo obrigatório', minlength:'Minimo três caracteres'},
          
            
        },
    });
});







function addModalidade(modalidade){
    try {

        let modalidade =  {modalidade: document.getElementById('txtnomeModalidade').value}

   $.ajax({
            url:'/modalidades',
            type:'post',
            dataType:'json',
            data:JSON.stringify(modalidade),
            contentType:'application/json',
            success:function(){
                alert('sucesso');
                location.href="http://localhost:3000/listarmodalidades.html";
               
               

            },
            error:function()
            {alert("error")}
        })
       
    } catch (error) {
        console.log(error);

    }
}