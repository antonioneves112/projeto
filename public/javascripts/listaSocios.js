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
    let result = $("#result");
    console.log(socios);
    let linhas = socios.map(function(v){
        return  "<tr> <td> "+ v.nif_socio+"</td> <td> " + v.nome_socio + " </td> <td> "+ v.email+" </td> <td> <a href='#'> DELETE </a>  </td> <td> <a href='#'> UPDATE </a>  </td> </tr>";
    });
   result.append(linhas);
   
}