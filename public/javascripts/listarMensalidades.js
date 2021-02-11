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
    let html="";
    let result = document.getElementById('result');

    for (let i of mensalidades){
        html+= "<tr>  <td>" + i.id_mensalidade + " </td><td>" + i.nif_socio +" </td><td>" + i.data_vencimento.replace(/T00:00:00.000Z/g,"") + "</td> <td> "+ i.data_pagamento.replace(/T00:00:00.000Z/g,"")+ "</td> <td> "+i.valor+" </td> <td>"+i.pago+" </td> <td> <input type='button' class='btnk' onclick='deletaMensalidade("+encodeURI(i.id_mensalidade)+")' value='DEL' id='"+encodeURI(i.id_mensalidade)+"'/> </td>   </tr>";
    }

    result.innerHTML = html
}




function deletaMensalidade (id_mensalidade){
    let confirma = confirm('deseja mesmo apagar mensalidade ?');
    if (!confirma){
        return false;
    }else{
        $ .ajax({
            url:"/mensalidades/"+id_mensalidade,
            method:"delete",
            dataType:"json",
            contentType:"application/json",

            success:function(dados){
                alert('modalidade apagada com sucesso !');
                str = "#"+dados;
                $(str).closest("tr").remove();
            },
            error:function(){
                console.log('Não Foi Possível apagar mensalidade!');
            }

           
        });
    }
      
      
    }

