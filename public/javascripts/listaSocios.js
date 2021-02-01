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
    let html =""
    for (let socio in socios){
        html+= "<div>" + socio.Nome + "</div>"
    }
    result.innerHTML = html;

}