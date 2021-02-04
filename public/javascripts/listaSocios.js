//AO CARREGAR A PÁGINA CARREGA A FUNÇÃO LOADSOCIOS

window.onload = function (){
  
    loadSocios();
}




//ATRAVÈS DA VARIAVEL SÓCIOS VEM OS DADOS REQUISITADOS ATRAVÈS DO SOCIO ROUTES 

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
        elemResult.innerHTML = '<h2> Problema no carregamento do Socio </h2>'+
                                '<p> Por Favor Tente Novamente mais Tarde</p>'
    }
     
}

// ESTA FUNÇÃO PERCORRE O OBJETO SOCIOS QUE CONTEM OS VALORES PASSADOS ATRAVÈS DA BASE DE DADOS E INJETA NA DIV RESULT 

function showSocios(socios){
    let result = document.getElementById('result');
    let linhas = ""
    for (let socio of socios){
        linhas+= "<tr> <td> "+ socio.nif_socio + " </td> <td> " + socio.nome_socio + " </td> <td> "+ 
        socio.email+" </td> <td> <input type='button' onclick='deletaSocio(" +encodeURI(socio.nif_socio)+ ")' value ='apagar' id='"+encodeURI(socio.nif_socio)+"' /> </td> <td> <a href='./editSocio.html?id="+encodeURI(socio.nif_socio)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}

//FUNÇÃO PARA APAGAR SÓCIOS PASSAMOS O NIf_SOCIO PARA O SOCIOS ROUTES

async function  deletaSocio(nif_socio){
    try {
        let confirma = confirm('Deseja mesmo apagar Sócio?');
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
                alert('errorAJAX');
            }
        });
        alert(JSON.stringify(result));
    }
     catch (error) {
         console.log(error);
        
    }
}


