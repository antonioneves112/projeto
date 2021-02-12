// =================================== JAVASCRIPT CLIENTE PARA ADICIONAR INSTRUTOR ================================================================================
$(function (){
   
        $.ajax({
            url:'/modalidades',
            method:'get',
            dataType:'json',
            success:function(dados){
                console.log(dados);
                let options =  $.map(dados,function(v,i){
                   return "<option value='"+v.id_modalidade+"'> "+v.modalidade+" </option>";
                });

                console.log(options);
                $("#selectmodalidade").append(options);

    
                
            },error:function(err){
                console.log(err)
            }
        });
   
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
                txtcontacto: { required: true, digits: true, minlength: 9 , maxlength:9 },
                txtemail: {  required: true,  email:true },
              
              
            }
            
            ,
            messages: {
                txtnif: {  required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos'},
                txtnome: {  required:'Campo obrigatório', minlength:'Campo deve conter mais de dois caracteres'},
                txtcontacto: { required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos'},
                txtemail: {  required:'Campo obrigatório',  email:'coloque um endereço de email válido '}
               
                
            },
    
       });
    
  
    $("#btn").click(function(evt){
       evt =evt?evt:window.event;
       evt.preventDefault(); 
       if($("#frm").valid()){
          let instrutor = {
              nif : document.getElementById('txtnif').value,
              nome: document.getElementById('txtnome').value,
              contacto : document.getElementById('txtcontacto').value,
              email : document.getElementById('txtemail').value,
              id_modalidade : document.getElementById('selectmodalidade').value,

              
             
          };

          $.ajax({
              url:"/instrutores",
              method:"post",
              dataType:"json",
              data: JSON.stringify(instrutor),
              contentType : "application/json",
              success:function(dados){
                  alert('instrutor inserido com sucesso !');
                  window.location.href="./instrutores.html";
              },
              error:function(err){
              
                  alert('Chave duplicada');
              }
          });
       }
       else{
           alert("Formulário Inválido");
       }
  
    });
  });
  
  
  