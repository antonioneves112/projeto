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
        html+= "<tr>  <td>" + i.id_mensalidade + " </td><td>" + i.nif_socio +" </td><td>" + i.data_vencimento + "</td> <td> "+ i.data_pagamento+ "</td> <td> "+i.valor+" </td> <td>"+i.pago+" </td> <td> <input type='button' class='btnk' onclick='deletaMensalidade("+encodeURI(i.id_mensalidade)+")' value='DEL' id='"+encodeURI(i.id_mensalidade)+"'/> </td>   </tr>";
    }

    result.innerHTML = html
}




async function deletaMensalidade (id_mensalidade){
    try {
        let confirma = confirm ('Deseja realmente apagar Mensalidade ?');
        if (!confirma){
            return false;
        }
        let result = await $ .ajax({
            url:'/mensalidades/'+id_mensalidade,
            method:'delete',
            dataType:'json',
            contentType:'application/json',
            success:function(dados){
                console.log(dados)
                let str = "#" + dados;
                $(str).closest("tr").remove();
                
            },error:function(){
                console.log('Não Foi Possível apagar mensalidade!');
            }
        })
    } catch (error) {
        console.log(error);
    }
}