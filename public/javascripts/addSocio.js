// =================================== JAVASCRIPT CLIENTE PARA ADICIONAR SOCIO ================================================================================

async function addSocio(){
   let res=document.getElementById('result');
    let socio = {
        nif_socio : document.getElementById('txtnif_socio').value,
        nome_socio : document.getElementById('txtnome_socio').value,
        morada : document.getElementById('txtmorada').value,
        email : document.getElementById('txtemail').value,
        telefone : document.getElementById('txttelefone').value,
        nib : document.getElementById('txtnib').value
    }  
    try {
        let result = await $.ajax({
            url:"/socios/add",
            method:"post",
            data:JSON.stringify(socio),
            contentType:"application/json",
            dataType:"json",
        });
        res.innerHTML = "Inserted Prod " + socio.nome_socio;
    } catch (error) {
        console.log(error);
        if(error.responseJSON){
            res.innerHTML = error.responseJSON.msg;
        }else{
            res.innerHTML=" NÃO FOI POSSÌVEL INSERIR PRODUTO";
        }
        
    }
}