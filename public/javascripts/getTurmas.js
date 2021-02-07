


function getTurma(nif){

    try {
        let socios = $.ajax({
            url:'/socios/turmas/'+nif,
            method:'get',
            datatype:'json',
            success: function(socios){
            showTurma(socios);
            },error: function(){
            
            }
        });
           
    } catch (error) {


   /*
        let elemResult = document.getElementById('result');
        console.log(error);
        elemResult.innerHTML = '<h2> Problema no carregamento do Socio </h2>'+
                                '<p> Por Favor Tente Novamente mais Tarde</p>'
                                */
    }
     
}

function showTurma(socios){
    
   console.log(socios);
    let result = document.getElementById('result');
    let linhas = ""
    for (let socio of socios){
        linhas+= "<tr> <td> "+ socio.nif_socio + " </td> <td> " + socio.nome_socio + " </td> <td> "+ 
        socio.morada+" </td> <td>"+socio.telefone +"</td><td> <input type='button'   onclick='deletaSocio(" +encodeURI(socio.nif_socio)+ ")' value ='DEL' id='"+encodeURI(socio.nif_socio)+"' /> </td> <td> <a href='./editSocio.html?id="+encodeURI(socio.nif_socio)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}