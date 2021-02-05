window.onload = async function(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    try {
        let instrutor = await $.ajax({
            url:"/instrutores/"+myParam,
            method:'get',
            dataType:'json',
            success: function (dados){
                let instrutor = dados;
                console.log(JSON.stringify(dados));

                console.log(instrutor[0].nome);

              
                document.getElementById('txtnif').value = instrutor[0].nif;
                document.getElementById('txtnome').value = instrutor[0].nome;
                document.getElementById('txtcontacto').value = instrutor[0].contacto;
                document.getElementById('txtemail').value = instrutor[0].contacto;
              
            }
        })
        console.log(instrutor);
    } catch (error){
    console.log(error);    
    }

}


async function updateInstrutor(instrutor){
    try {
        let instrutor = {
            nif: document.getElementById('txtnif').value,
            nome: document.getElementById('txtnome').value,
            contacto : document.getElementById('txtcontacto').value,
            email : document.getElementById('txtemail').value
        }
        console.log('porcaia');
        console.log(instrutor);
        let result = await $.ajax({
            url:'/instrutores',
            method:'put',
            dataType:'json',
            data:JSON.stringify(instrutor),
            contentType:'application/json'
        });
        alert(JSON.stringify(result));
    } catch (error) {
        console.log(error);

    }
}