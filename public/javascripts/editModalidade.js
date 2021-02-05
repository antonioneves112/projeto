window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');



try {
    let modalidade = await $.ajax({

        url:'/modalidades/'+myParam,
        method:'get',
        dataType:"json",
        success: function(dados){
            let modalidade = dados;
           

            document.getElementById('txtid_modalidade').value = modalidade[0].id_modalidade;
            document.getElementById('txtnomeModalidade').value = modalidade[0].modalidade;

        }

    
    }) 
    console.log(modalidade);
} catch (error) {
    console.log(error);
}

}