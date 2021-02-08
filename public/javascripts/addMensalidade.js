async function addMensalidade (mensalidade){

try {
    let mensalidade = {
        nif_socio: document.getElementById("txtnif_socio").value,
        data_vencimento: document.getElementById("txtdata_vencimento").value,
        data_pagamento: document.getElementById("txtdata_pagamento").value,
        valor:document.getElementById("txtvalor").value,
        pago: document.getElementById("txtestadopagamento").value

    }

    let mensalidade = await $.ajax({
        url:'/mensalidades',
        method:'post',
        dataType: 'json',
        data:JSON.stringify(mensalidade),
        contentType:'application/json'
    })
    
} catch (error) {
    console.log(error);
}


}