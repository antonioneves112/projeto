window.onload = function (){
    loadMensalidades();
}


async function loadMensalidades(){
    try {
        let mensalidades = await $ .ajax({
            url:'/mensalidades',
            method:'get',
            dataType:'json',
        })

        showMensalidades(mensalidades);
    } catch (error) {
        console.log(error)
    }
}


function showMensalidades(mensalidades){
    
    
    let result = document.getElementById('result');
    let html="";

    for (let i of mensalidades){
        html+= "<tr>  <td>" + i.id_mensalidade + " </td><td>" + i.nif_socio +" </td><td>" + i.data_vencimento + "</td> <td> "+ i.data_pagamento+ "</td> <td> "+i.valor+" </td> <td>"+i.pago+" </td>    </tr>"
    }

    result.innerHTML = html
}