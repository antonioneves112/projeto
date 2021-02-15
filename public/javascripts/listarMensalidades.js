function btupdate(id_mensalidade) {
    return " <input type='submit' id='" + id_mensalidade + "'  name='btu' class='btnk' value ='UPDATE'  />";
}

function btsave(id_mensalidade) {
    return " <input type='submit'   id='" + id_mensalidade + "'  onclick='saveMensalidade(" + id_mensalidade + ")' name='btsave' class='btnk' value='SAVE'/>";
}

function btcancel(id_mensalidade) {
    let novoid = id_mensalidade + "cancel";
    return " <input type='submit'   id='" + novoid + "'  onclick='cancelMensalidade(" + id_mensalidade + ")' name='btcancel' class='btnk' value='CANCEL' />";
}


function cancelMensalidade(id_mensalidade) {
    loadMensalidades();
}


$(function () {
    $.ajax({
        url: '/socios',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            $('#selectsocios').html('');
            $("#selectsocios").append("<option value='-1'> Todos </option>");
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.nif_socio + "'> " + v.nome_socio + " </option>";
            });

            $("#selectsocios").append(options);

        }, error: function (err) {
            console.log('erro no select')
        }
    });


    loadMensalidades();



    $('#selectsocios').change(function (evt) {
        evt = evt ? evt : window.event;
        let nif = $(evt.target).val();
        let rota = (nif == -1) ? '/mensalidades' : '/mensalidades/' + nif;
        $.ajax({
            url: rota,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                showMensalidades(dados);
            }, error: function () {
                alert('erro na execução do filtro');
            }
        })

    });


    $('#selectdivida').change(function (evt) {
        evt = evt ? evt : window.event;
        let pago = $(evt.target).val();
        let rota = (pago == -1) ? '/mensalidades' : '/mensalidades/pagos/' + pago;
        $.ajax({
            url: rota,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                showMensalidades(dados);
            }, error: function () {
                alert('ERRO NA FILTRO');
            }
        })

    });

    $('#selectmes').change(function (evt) {
        evt = evt ? evt : window.event;
        let mes = $(evt.target).val();
        $.ajax({
            url: '/mensalidades/meses/' + mes,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                console.log(dados);
                showMensalidades(dados);

            }, error: function () {
                alert('erro na execução do filtro');
            }
        })

    });




$('#btgerarmensalidades').click(function(evt){
    evt=evt?evt:window.event;
    evt.preventDefault();
    let mes = $('#selectmes').val();
    let ano = new Date().getFullYear();
    let data = ano + '/'+ mes +'/01';
    alert(data);
    $.ajax({
        url:'/mensalidades/',
        method:'post',
        dataType:'json',
        data:{data_vence:data},
        success:function(dados){
            showMensalidades(dados);
        },error:function(error){
            console.log(error);
        }
    })
   





});




});

// ====================================================================== FIM DO ONLOAD =============================================================================================

function loadMensalidades() {
    try {
        $.ajax({
            url: '/mensalidades',
            method: 'get',
            dataType: 'json',
            success: function (mensalidades) {
                showMensalidades(mensalidades);


            },
            error: function () {
                alert("Erro");

            }
        });

    } catch (error) {
        console.log(error)
    }
}

function showMensalidades(mensalidades) {

    if (mensalidades.length > 0) $("#btgerarmensalidades").hide();
    else $("#btgerarmensalidades").show();

    let html = "";
    let result = document.getElementById('result');
    for (let i of mensalidades) {
        let dp = (i.data_pagamento != null) ? i.data_pagamento.replace(/T00:00:00.000Z/g, "") : '';
        let dv = (i.data_vencimento != null) ? i.data_vencimento.replace(/T00:00:00.000Z/g, "") : '';
        console.log(dp);
        html += "<tr>  <td>" + i.id_mensalidade + " </td><td>" + i.nif_socio + " </td> <td>" + i.nome_socio + "</td><td>" + dv + "</td> <td> " + dp + "</td> <td> " + i.valor + " </td> <td>" + i.pago + " </td> <td> <input type='button' class='btnk' onclick='deletaMensalidade(" + encodeURI(i.id_mensalidade) + ")' value='DEL' id='" + encodeURI(i.id_mensalidade) + "'/>  </td><td> " + btupdate(encodeURI(i.id_mensalidade)) + " </td>   </tr>";
    }
    result.innerHTML = html;
    $("tr").filter(function () {
        return $(this).find('td:eq(6)').text() == 1;
    }).css('background-color', 'rgba(76, 175, 80, 0.3)');

    $("[name='btu']").click(function (evt) {
        evt = evt ? evt : window.event;
        evt.preventDefault();
        let linha = $(evt.target).closest("tr");
        let id_mensalidade = evt.target.id
        let data_pagamento = linha.find("td:eq(4)").html();
        linha.find("td:eq(4)").html("<input type='date' id='datepicker' name='id_m' value='" + data_pagamento + "' style='width:130px;' />");

        let valor = linha.find("td:eq(5)").html();
        linha.find("td:eq(5)").html("<input type='text'    name='id_m' value='" + valor + "' style='width:130px;' />");
        linha.find("td:eq(7)").html(btcancel(encodeURI(id_mensalidade)));
        linha.find("td:eq(8)").html(btsave(id_mensalidade));
        linha.css("background-color", 'black');


    });
}


function saveMensalidade(id) {

    let ctrl = "#" + id;
    let linha = $(ctrl).closest("tr");
    console.log(linha);
    let pago2 = (new Date(Date.parse(linha.find("td:eq(4)").find('input').val()))) ? 1 : 0;
    let mensalidade = {
        id_mensalidade: id,
        nif_socio: linha.find("td:eq(1)").text(),
        data_vencimento: linha.find("td:eq(3)").text(),
        data_pagamento: linha.find("td:eq(4)").find('input').val(),
        valor: linha.find("td:eq(5)").find('input').val(),
        pago: pago2

    };
    try {
        $.ajax({
            url: '/mensalidades',
            method: 'put',
            data: JSON.stringify(mensalidade),
            dataType: 'json',
            contentType: "application/json",
            success: function (dados) {
                loadMensalidades();

            }, error: function () {
                alert('error');
            }
        })
    } catch (error) {

    }
}

function deletaMensalidade(id_mensalidade) {
    let confirma = confirm('deseja mesmo apagar mensalidade ?');
    if (!confirma) {
        return false;
    } else {
        $.ajax({
            url: "/mensalidades/" + id_mensalidade,
            method: "delete",
            dataType: "json",
            contentType: "application/json",

            success: function (dados) {
                alert('modalidade apagada com sucesso !');
                str = "#" + dados;
                $(str).closest("tr").remove();
            },
            error: function () {
                console.log('Não Foi Possível apagar mensalidade!');
            }
        });
    }


}
