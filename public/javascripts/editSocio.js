window.onload = async function(){

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