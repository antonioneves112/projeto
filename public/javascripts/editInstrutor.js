window.onload = async function(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    
    try {
        let instrutor = await $.ajax({
            url:"/instrutores/"+myParam,
            method:'get',
            dataType:'json',
            success: function (dados){
               // let instrutor = dados;
               // console.log(JSON.stringify(dados));
               // console.log(dados.instrutor.data[0].nome);
               // console.log(dados.modalidades.data[3].modalidade);
            
                document.getElementById('txtnif').value = dados.instrutor.data[0].nif;
                document.getElementById('txtnome').value = dados.instrutor.data[0].nome;
                document.getElementById('txtcontacto').value = dados.instrutor.data[0].contacto;
                document.getElementById('txtemail').value = dados.instrutor.data[0].email;
               
                let modalidades = dados.modalidades.data;
                html =""
                let section = document.getElementById('selmodalidade')
                for (let i of modalidades){
                    
                 
                    html+=   "<option value='"+ i.id_modalidade+"'> "+ i.modalidade +"</option>"

                }
               // console.log(modalidades);
               // console.log(html);

                section.innerHTML = html;
                document.getElementById('selmodalidade').value = dados.instrutor.data[0].id_modalidade;

                
            }
        })
       
        
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
            email : document.getElementById('txtemail').value,
            id_modalidade : document.getElementById('selmodalidade').value
        }
       
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