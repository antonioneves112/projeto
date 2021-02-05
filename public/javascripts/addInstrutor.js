
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
        alert(JSON.stringify(result));

    } catch (error) {
        console.log(error);
    }
}