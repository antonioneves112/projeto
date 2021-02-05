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
        showModalidades(modalidades)
    } catch (error) {
        let result = document.getElementById('result');
        console.log(error);

        result.innerHTML = "<h2> FALHA NA LISTAGEM DE MODALIDADES </h2>"
    }
}

function showModalidades(modalidades){
    let linhas = "";
    let result = document.getElementById('result');
    for (i of modalidades){
        linhas+= linhas+= "<tr> <td> "+ i.id_modalidade + " </td> <td> " + i.modalidade + " </td>"+
       " </td> <td> <input type='button' onclick='deletaModalidade(" +encodeURI(i.id_modalidade)+ ")' value ='apagar' id='"+encodeURI(i.id_modalidade)+"' /> </td> <td> <a href='./editModalidade.html?id="+encodeURI(i.id_modalidade)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML=linhas;
}


async function deletaModalidade(nif){

    try {
        let confirma = confirm('Deseja mesmo apagar modalidade ?');
        if(!confirma){
            return false;
        }
       
        let result = await $.ajax({
            url:'/modalidades/'+nif,
            method:'delete',
            dataType:'json',
            contentType:"application/json",
            success:function(nifretornado){
                console.log(nifretornado);
                var str = "#" + nifretornado;
                $(str).closest("tr").remove();
            },error:function(){
                alert('Não foi possível apagar modalidade');
            }
        })


    } catch (error) {
        console.log(error);
    }

}