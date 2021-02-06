window.onload = function (){
    loadModalidades();
}


async function loadModalidades(){
    try {
        let modalidades = await $.ajax({
            url:'/modalidades',
            method:'get',
            dataType:'json'
        });
        showModalidades(modalidades);
    } catch (error) {
        let result = document.getElementById('result');
        console.log(error);

        result.innerHTML = "<h2> FALHA NA LISTAGEM DE MODALIDADES </h2>"
    }
}

function showModalidades(modalidades){
    let linhas = "";
    let result = document.getElementById('result');
    for (let i of modalidades){
        linhas+= "<tr> <td> "+i.id_modalidade +"<td>"+i.modalidade+"</td> " +
        "<td> <input type='button' class='btnk'  id='"+encodeURI(i.id_modalidade) +"'     onclick='deletaModalidade(" + encodeURI(i.id_modalidade) +  ")'  value='DEL'  /> </td>  </tr> "


   
    }
    result.innerHTML=linhas;
}


function deletaModalidade(nif){

    try {
        let confirma = confirm('Deseja mesmo apagar modalidade ?');
        if(!confirma){
            return false;
        }
       
         $.ajax({
            url:'/modalidades/'+nif,
            method:'delete',
            dataType:'json',
            contentType:"application/json",
            success:function(dados){
            
     
                
                let str = "#" + dados;
                console.log(str);
                $(str).closest("tr").remove();
            },
            error:function(){
                alert('Não foi possível apagar modalidade');
            }
        })


    } catch (error) {
        console.log(error);
    }

}