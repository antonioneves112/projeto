window.onload = function (){
  
    loadSocios();
}

/*
function sacaSocio(evt){
    evt = evt ? evt : window.event;
    evt.preventDefault();
    alert(evt.target.id);

    try {
        let result = $.ajax({
            url:'/socios',
            method:'put',
            dataType:'json',

        })
    } catch (error) {
        
    }
}
*/




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
    for (let socio of socios){
        linhas+= "<tr> <td> "+ socio.nif_socio + " </td> <td> " + socio.nome_socio + " </td> <td> "+ 
        socio.email+" </td> <td> <a href='#'> DELETE </a>  </td> <td> <a href='./editSocio.html' > UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}