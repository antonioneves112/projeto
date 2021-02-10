//AO CARREGAR A PÁGINA CARREGA A FUNÇÃO LOADMODALIDADES
window.onload = function (){
    loadModalidades();
}

//LADO CLIENTE PASSA REQUISIÇÃO DE QUE QUER TODAS AS MODALIDADES PARA A ROTA QUE POR SUA VEZ VAI RETORNAR DO MODEL OS VALORES RETIRADOS DA BASE DE DADOS
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
        result.innerHTML = "<h2> FALHA NA LISTAGEM DE MODALIDADES </h2>"
    }
}

//FUNÇÃO QUE INJETA OS VALORES DO OBJETO RETORNADOS PELO MODEL 
function showModalidades(modalidades){
    let linhas = "";
    let result = document.getElementById('result');
    for (let i of modalidades){
        linhas+= "<tr> <td> "+i.id_modalidade +"<td>"+i.modalidade+"</td> " + "<td>" + i.nif_instrutor + "</td>" +
        "<td> <input type='button' class='btnk'  id='"+encodeURI(i.id_modalidade) +"'     onclick='deletaModalidade(" + encodeURI(i.id_modalidade) +  ")'  value='DEL'  /> </td>  </tr> ";
    }
    result.innerHTML=linhas;
}

//FUNÇÃO PARA APAGAR MODALIDADE CLIENTE ENVIA O NIF PARA A ROTA , A ROTA ENVIA PARA O MODEL O NIF PARA FAZER A QUERY NA BASE DE DADOS
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
                //COM ID RECEBIDO EM DADOS VOU REFERENCIAR EM JQUERY O BOTAO CLICADO NA TABELA. POR SUA VEZ O BOTAO REFERENCIA A LINHA MAIS PROXIMA ONDE ESTA METIDO E REMOVE.
                let str = "#" + dados;
                alert(str);
                $(str).closest("tr").remove();
            },
            error:function(){
                alert('Não foi possível apagar modalidade!');
            }
        })
    } catch (error) {
        console.log(error);
    }

}