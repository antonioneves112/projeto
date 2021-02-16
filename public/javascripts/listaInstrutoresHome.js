//AO INICAR A PÁGINA RETORNAMOS O NIF DO LINK CARREGADO ATRAVÉS DA VÁRIAVEL MYpARAM 
window.onload = function (){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('nif');
    
    loadInstrutor(myParam);
}

//FUNÇÃO PARA QUE ENVIA O NIF_INSTRUTOR PARA A ROTA PARA O MODEL REALIZAR A QUERY PARA SÓ TRAZER O SÓCIO COM O NIF_INSTRUTOR PASSADO
async function loadInstrutor(nif_instrutor){
    try {
        let instrutor = await $.ajax({
            url:'/instrutores/'+nif_instrutor,
            method:'get',
            dataType:'json',
            contentType:'application/'
        })
        //JSON.STRINGIFY CONVERTE O OBJETO RECEBIDO PARA STRING PARA PODERMOS INSERIR NOS VALORES DOS CAMPOS POIS O JAVASCRIPT TEM QUE TRABALHAR COM STRING PARA INSERIR O VALOR NO CAMPO
        showInstrutor(JSON.stringify(instrutor));
    } catch (error) {
        
    }

}

//FUNÇÃO PARA MOSTRAR O INSTRUTOR
function showInstrutor(instrutor){
    let result = document.getElementById('result');
    //CONVERTEMOS O CONTEÚDO DO OBJETO INSTRUTOR PARA UMA STRING PARA PODER COLOCAR NOS CAMPOS DO FORMULÁRIO
    let x = JSON.parse(instrutor);
    //COLOCAMOS OS VALORES DO INPUT COM OS VALORES DO OBJETO RETURNADO 
    document.getElementById('txtnif').value= x.instrutor.data[0].nif;       
    document.getElementById('txtnome').value= x.instrutor.data[0].nome;       
    document.getElementById('txtcontacto').value= x.instrutor.data[0].contacto;       
    document.getElementById('txtemail').value= x.instrutor.data[0].email;
    document.getElementById("img").src =x.instrutor.data[0].foto;

    let modalidade= '';
    //PERCORREMOS A VARIAVEL DO OBJETO AGORA EM STRING E 

    for (m of x.modalidades.data){
        if(m.id_modalidade == x.instrutor.data[0].id_modalidade){
            modalidade = m.modalidade;
            break;
    }
}
    //INSERIMOS OS VALORES QUE ESTAVAM NO OBJETO E COLOCAMOS NO ELEMENTO SELECT
    document.getElementById('selmodalidade').value=modalidade;
}


