//AO CARREGAR A PÁGINA CARREGA A FUNÇÃO LOADSOCIOS

window.onload = function (){  
    loadSocios();
}


//ATRAVÈS DA VARIAVEL SÓCIOS VEM OS DADOS REQUISITADOS DA ROTA SÓCIOS 
async function loadSocios(){
    try {
        let socios = await $.ajax({
            url:'/socios',
            method:'get',
            datatype:'json'
        });
            showSocios(socios);
    } catch (error) {
        let elemResult = document.getElementById('result');
        console.log(error);
        elemResult.innerHTML = '<h2> Problema no carregamento dos Socios </h2>'        
    }
}

// ESTA FUNÇÃO PERCORRE O OBJETO SOCIOS QUE VEM DA BASE DE DADOS ATRAVÉS DA ROTA QUE PROVÈM DA BASE DE DADOS E INJETA NA DIV COM O ID RESULT 
function showSocios(socios){
    let result = document.getElementById('result');
    let linhas = ""
    for (let socio of socios){
        linhas+= "<tr> <td> "+ socio.nif_socio + " </td> <td> " + socio.nome_socio + " </td> <td> "+ 
        socio.morada+" </td> <td>"+socio.telefone +"</td> <td>"+socio.modalidade +"</td> <td> <input type='button' class='btnk'   onclick='deletaSocio(" +encodeURI(socio.nif_socio)+ ")' value ='DEL' id='"+encodeURI(socio.nif_socio)+"' /> </td> <td> <a href='./editSocio.html?id="+encodeURI(socio.nif_socio)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}

//FUNÇÃO PARA APAGAR SÓCIOS PASSAMOS O NIf_SOCIO PARA A ROTA /SOCIOS
async function  deletaSocio(nif_socio){
    try {
        let confirma = confirm('Deseja realmente apagar Sócio?');
        if(!confirma){
            return false;
        }
        let result = await $.ajax({
            url:"/socios/"+nif_socio,
            method:"DELETE",
            dataType:"json",
            contentType : "application/json",
            success:function(dados){
                console.log(dados);
                var str= "#" + dados;
                $(str).closest("tr").remove();
            },error:function(){
                alert('Não Foi possível apagar sócio ');
            }
        });
    }
     catch (error) {
         console.log(error);
    }
}