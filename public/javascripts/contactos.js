function enviarMensagem(){
    
    alert('teste');

    let result = document.getElementById('result')
    
    let nome = document.getElementById("txtnome").value;
    let email = document.getElementById("txtemail");
    let telefone = document.getElementById("txttelefone");
    let mensagem = document.getElementById("txtnome");

    result.innerHTML = "<p> O " + nome + "com o email " + email + "telefone : " + telefone + " enviou a seginte mensagem <br> " + mensagem + "</p>" 

}



