window.onload = function () {
    loadInstrutores();
}

//SEMELHANTE AOS OUTROS LISTAR 
async function loadInstrutores(){
   try {
    let instrutores = await $.ajax({
        url:'/instrutores',
        method:'get',
        dataType:'json'
    });
    showInstrutores(instrutores);
   } catch (error) {
       let elemResult = document.getElementById('result');
       console.log(error);
       elemResult.innerHTML = '<h2> Problema ao Carregar Instrutores </h2>'
   }
}


function showInstrutores(instrutores){
    let result = document.getElementById('result');
    let linhas = ""
    for (let i of instrutores){
        linhas+= "<tr> <td> "+ i.nif + " </td> <td> " + i.nome + " </td> <td> "+ 
        i.contacto+" </td> <td> " + i.email +  "<td> <input type='button' id='btnk' onclick='deletaInstrutor(" +encodeURI(i.nif)+ ")' value ='DEL' id='"+encodeURI(i.nif)+"' /> </td> <td> <a href='./editInstrutor.html?id="+encodeURI(i.nif)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}


async function  deletaInstrutor(nif){
    try {
        let confirma = confirm('Deseja mesmo apagar Sócio?');
        if(!confirma){
            return false;
        }
        let result = await $.ajax({
            url:"/instrutores/"+nif,
            method:"DELETE",
            dataType:"json",
            contentType : "application/json",
            success:function(nifretornado){
                console.log(nifretornado);
                //COM ID RECEBIDO EM DADOS VOU REFERENCIAR EM JQUERY O BOTAO CLICADO NA TABELA. POR SUA VEZ O BOTAO REFERENCIA A LINHA MAIS PROXIMA ONDE ESTA METIDO E REMOVE
                var str= "#" + nifretornado;
                $(str).closest("tr").remove();
            },error:function(){
                alert('O Registo não pode ser apagado enquanto o intrutor tiver aulas');
            }
        });
    }
     catch (error) {
         console.log(error); 
    }
}


