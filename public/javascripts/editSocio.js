//AO CARREGAR A PÀGINA O JAVASCRIPT VAI RECEBER OS CAMPOS DO SOCIO COM O ID QUE FOI PASSADO NA  MYPARAMS

window.onload = async function(){

    $(function (){
        $("#frm").validate({
    
            wrapper: 'span',
            errorPlacement: function (error, element) {
                error.css({'padding-left':'10px','margin-right':'20px','padding-bottom':'2px'});
                error.addClass("arrow")
                error.insertAfter(element);
            },
    
    
            rules: {
               
                txtnif_socio: { required: true , digits: true , minlength: 9 , maxlength:9 },
                txtnome_socio: { required: true , minlength:2 },
                txtmorada: {  required: true , minlength:5},
                txtemail: {  required: true ,  email:true  },
                txttelefone: {  required: true , digits: true , minlength: 9 , maxlength:9 },

              
            }
            
            ,
            messages: {
               
                txtnif_socio: { required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
                txtnome_socio: { required:'Campo obrigatório', minlength:'Campo deve conter mais de dois caracteres' },
                txtmorada: {  required:'Campo obrigatório', minlength:'Campo deve conter mais de cinco caracteres'},
                txtemail: {  required:'Campo obrigatório',  email:'coloque um endereço de email válido '},
                txttelefone: { required:'Campo obrigatório', digits:'Insira apenas digitos', minlength:'Minimo 9 caracteres', maxlength: 'Máximo 9 digitos' },
               
                
                
            },
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');

    try {
        let socio = await $.ajax({
            url:"/socios/"+myParam,
            method:'get',
            dataType:'json',
           success:function(dados){
               let socio = dados;
                console.log(JSON.stringify(dados));
          
                console.log(socio[0].nome_socio);

                document.getElementById('txtnif_socio').value= socio[0].nif_socio;       
                document.getElementById('txtnome_socio').value= socio[0].nome_socio;       
                document.getElementById('txtmorada').value= socio[0].morada;       
                document.getElementById('txtemail').value= socio[0].email;       
                document.getElementById('txttelefone').value= socio[0].telefone;       
                document.getElementById('txtnib').value= socio[0].nib;       
           }
            
        })
        console.log(socio);
    } catch (error) {
        console.log(error);
    }


    
}


//RECOLHE OS DADOS PREENCHIDOS NO FORMULÁRIO E PASSA NUM OBJETO RESULT PARA O SOCIO ROUTES
 
async function updateSocio(socio){
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
            method:"put",
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