 function addModalidade(modalidade){
    try {

        let modalidade =  {modalidade: document.getElementById('txtnomeModalidade').value}

   $.ajax({
            url:'/modalidades',
            type:'post',
            dataType:'json',
            data:JSON.stringify(modalidade),
            contentType:'application/json',
            success:function(){
                alert('sucesso');
                location.href="http://localhost:3000/listarmodalidades.html";
               
               

            },
            error:function()
            {alert("error")}
        })
       
    } catch (error) {
        console.log(error);

    }
}