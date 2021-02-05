async function addModalidade(modalidade){
    try {

        let modalidade = {
            id_modalidade: document.getElementById('txtid_modalidade').value,
            modalidade: document.getElementById('txtnomeModalidade').value
           
        }

        let result = await $.ajax({
            url:'/modalidades',
            method:'post',
            dataType:'json',
            data:JSON.stringify(modalidade),
            contentType:'application/json'
        })

    } catch (error) {
        console.log(error);

    }
}