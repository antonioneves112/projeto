// =================================== JAVASCRIPT CLIENTE PARA ADICIONAR SOCIO ================================================================================

async function addSocio(){
    try {
       let socio = {
           nif_socio : document.getElementById('txtnif_socio').value,
           nome_socio : document.getElementById('txtnome_socio').value,
           morada : document.getElementById('txtmorada').value,
           email : document.getElementById('txtemail').value,
           telefone : document.getElementById('txttelefone').value,
           nib : document.getElementById('txtnib').value
    }

        alert(JSON.stringify(socio));
        let result = await $.ajax({
            url:"/socios",
            method:"post",
            dataType:"json",
            data:JSON.stringify(socio),
            contentType:"application/json"
        });
        alert(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        
    }
}