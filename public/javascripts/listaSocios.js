window.onload = function (){
  
    loadSocios();
}





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


function showSocios(socios){
    let result = document.getElementById('result');
    let linhas = ""
    let x=4;
    for (let socio of socios){
        linhas+= "<tr> <td> "+ socio.nif_socio + " </td> <td> " + socio.nome_socio + " </td> <td> "+ 
        socio.email+" </td> <td> <input type='button' onclick='deletaSocio("+encodeURI(socio.nif_socio)+")'  value ='apagar' /> </td> <td> <a href='./editSocio.html?id="+encodeURI(socio.nif_socio)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}


async function  deletaSocio(nif){
    try {
        let result = await $.ajax({
            url:"/socios/"+nif,
            method:"delete",
            dataType:"json",
            contentType : "application/json",
            sucess:function(dados){
                console.log(dados);
            },error:function(){
                alert('error');
            }
        });
        alert(JSON.stringify(result));
    }
     catch (error) {
         console.log(error);
        
    }


}
