
// ------------------------------------------------------------------------------ ONLOAD ---------------------------------------------------------------------------------------
$(function () {
    recolherDadosInstrutor();
});

//----------------------------------------------------------------------------------------  ONLOAD --------------------------------------------------------------------------------

async function recolherDadosInstrutor() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        let instrutor = await $.ajax({
            url: 'instrutores/instrutoreshome/' + myParam,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
            }, error() {
                alert('erro ao carregar instrutores ');
            }
        })
        preencherInstrutores(instrutor);
    } catch (error) {
        console.log(error);
    }
}

function preencherInstrutores(instrutor) {
    document.querySelector("[name='img1']").setAttribute("src", instrutor[0].foto);
    document.querySelector("[name='txtnif']").value = instrutor[0].nif;
    document.querySelector("[name='txtnome']").value = instrutor[0].nome;
    document.querySelector("[name='txtcontacto']").value = instrutor[0].contacto;
    document.querySelector("[name='txtemail']").value = instrutor[0].email;
    document.querySelector("[name='selmodalidade']").value = instrutor[0].modalidade;
}