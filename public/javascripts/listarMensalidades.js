


// --------------------------------------------------------------------------------------------  ONLOAD -------------------------------------------------------------------------
$(function () {
    loadMensalidades();
    preencheSelectSocios();
    filtrarPorSocio();
    filtrarPorPagamento();
    filtrarPorMes();
    gerarMensalidades();


});


//--------------------------------------------------------------------------------------------- FIM ONLOAD -----------------------------------------------------------------------------
async function loadMensalidades() {
    try {
        await $.ajax({
            url: '/mensalidades',
            method: 'get',
            dataType: 'json',
            contentType: 'application/type',
            success: function (dados) {
                console.log(dados);
                showMensalidades(dados);
            }, error: function () {
                alert('erro no carregamento dos sócios');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function showMensalidades(mensalidades) {
    try {

        if (mensalidades.length > 0) $("#btgerarmensalidades").hide();
        else $("#btgerarmensalidades").show();
        let result = $("#result");
        result.html("");
        let linha = "";
        for (let i of mensalidades) {
            linha = "<tr><td>" + i.id_mensalidade + "</td><td> " + i.nif_socio + "</td><td>" + i.nome_socio + "</td><td>" + i.data_vencimento + "</td><td>" + i.data_pagamento + "</td><td>" + i.valor + "</td><td>" + i.pago + "</td> <td>" + delButton(encodeURI(i.id_mensalidade)) + " </td><td> " + editButton(encodeURI(i.id_mensalidade)) + "</td> </tr>";
            result.append(linha);
        }
        corPago();
        carregaEditButton();

    } catch (error) {

    }
}

async function saveMensalidade(id) {
    try {
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
        await $.ajax({
            url: '/mensalidades',
            method: 'put',
            data: JSON.stringify(mensalidade),
            dataType: 'json',
            contentType: "application/json",
            success: function (dados) {
                linha.find("td:eq(5)").text(dados.valor);
                linha.find("td:eq(4)").text(dados.data_pagamento);
                linha.find("td:eq(6)").text(dados.pago);

                corPago();
                alert('mensalidade editada com sucesso')

            }, error: function () {
                alert('error');
            }
        })


    } catch (error) {
        console.log(error)
    }
}
async function preencheSelectSocios() {
    try {
        await $.ajax({
            url: '/socios',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                let select = $('#selectsocios');
                select.html('');
                select.append("<option value='-1'> Todos Sócios </option>");
                let option = $.map(dados, function (v, i) {
                    return "<option value='" + v.nif_socio + "'> " + v.nome_socio + "  </option>"
                });
                select.append(option);
            }, error: function () {
                alert('erro na recolha dos sócios no select');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function carregaEditButton() {
    try {
        $("[name='btE']").click(function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            let linha = $(evt.target).closest("tr");
            linha.css("background-color", 'black');


            let id_mensalidade = evt.target.id
            let data_pagamento = linha.find("td:eq(4)").html();
            linha.find("td:eq(4)").html("<input type='date' name='id_m' value='" + data_pagamento + "' style='width:130px;' />");
            let valor = linha.find("td:eq(5)").html();
            linha.find("td:eq(5)").html("<input type='text' name='id_m' value='" + valor + "' style='width:130px;' />");
            linha.find("td:eq(7)").html(cancelButton(encodeURI(id_mensalidade)));
            cancelMensalidade();
            linha.find("td:eq(8)").html(saveButton(id_mensalidade));
        });
    } catch (error) {

    }
}

async function gerarMensalidades() {
    try {
        $('#btgerarmensalidades').click(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            let ano = prompt("Indique o ano:");
            let mes = $('#selectmes').val();
            await $.ajax({
                url: '/mensalidades/',
                method: 'post',
                dataType: 'json',
                data: { dia: '01', mes: mes, ano: ano },
                success: function (dados) {
                    showMensalidades(dados);
                    alert('mensalidades mes geradas para todos os sócios');
                }, error: function (error) {
                    console.log(error);
                }
            });
        })
    } catch (error) {

    }
}

async function deletaMensalidade(id_mensalidade) {
    try {
        let confirma = confirm('Deseja realmente apagar mensalidade ?');
        if (!confirma) {
            return false
        } else {
            await $.ajax({
                url: '/mensalidades/' + id_mensalidade,
                method: 'delete',
                dataType: 'json',
                contentType: 'application/json',
                success: function (dados) {
                    alert('mensalidade apagada com sucesso');
                    str = '#' + dados;
                    $(str).closest('tr').remove();
                }, error: function () {
                    alert('falha ao eliminar mensalidade');
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}


function corPago() {
    $("tr").filter(function () {
        return $(this).find('td:eq(6)').text() == 1;
    }).css('background-color', 'rgba(76, 175, 80, 0.3)');
}


//------------------------------------------------------------------------------------ FILTRAGENS -----------------------------------------------------------------------------
async function filtrarPorSocio() {
    try {
        $('#selectsocios').change(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            $('#selectdivida option').eq(0).prop('selected', true);
            $('#selectmes option').eq(0).prop('selected', true);
            let nif = $(evt.target).val();
            let rota = (nif == -1) ? '/mensalidades' : '/mensalidades/' + nif;
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
                    showMensalidades(dados);
                }, error: function () {
                    alert('erro na execução do filtro por socio');
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
}
async function filtrarPorPagamento() {
    try {
        $('#selectdivida').change(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            $('#selectsocios option').eq(0).prop('selected', true);
            $('#selectmes option').eq(0).prop('selected', true);
            let pago = $(evt.target).val();
            let rota = (pago == -1) ? '/mensalidades' : '/mensalidades/pagos/' + pago;
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
                    showMensalidades(dados);
                }, error: function () {
                    alert('erro na execução do filtro por pagamento');
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
}


async function filtrarPorMes() {
    try {
        $('#selectmes').change(async function (evt) {
            evt = evt ? evt : window.event;
            evt.preventDefault();
            let mes = $(evt.target).val();
            $('#selectsocios option').eq(0).prop('selected', true);
            $('#selectdivida option').eq(0).prop('selected', true);

            await $.ajax({
                url: '/mensalidades/meses/' + mes,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
                    showMensalidades(dados);
                }, error: function () {
                    alert('erro na execução do filtro por mes');
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
}







//-------------------------------------------------------------------------------------  BOTÕES ------------------------------------------------------------------------------------------
function editButton(id_mensalidade) {
    return "<input type='submit' id='" + id_mensalidade + "' name='btE' class='btnk' value='EDIT'/>";
}

function saveButton(id_mensalidade) {
    return " <input type='submit'   id='" + id_mensalidade + "'  onclick='saveMensalidade(" + id_mensalidade + ")' name='btsave' class='btnk' value='SAVE'/>";
}

function cancelButton(id_mensalidade) {
    return "<input type='submit' class='btnk' id='" + id_mensalidade + "' name='btCancel' value='CANCEL' />"
}

function cancelMensalidade() {
    $("[name='btCancel']").click(function (evt) {
        window.location.reload();
    });
}


function delButton(id_mensalidade) {
    return "<input type='button' id='" + id_mensalidade + "' class='btnk' onclick='deletaMensalidade(" + id_mensalidade + ")' value='DEL'  />";
}
