window.onload = function () {
    loadInstrutores();
}


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
        i.contacto+" </td> <td> " + i.email +  "<td> <input type='button' onclick='deletaSocio(" +encodeURI(i.nif)+ ")' value ='apagar' id='"+encodeURI(i.nif)+"' /> </td> <td> <a href='./editInstrutor.html?id="+encodeURI(i.nif)+"'> UPDATE </a>  </td> </tr>";
    }
    result.innerHTML = linhas;
}


