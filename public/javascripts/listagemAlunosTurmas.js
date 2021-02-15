$(function () {

    loadAlunosTurma();

    $.ajax({
        url: '/socios',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            $('#selectfiltrosocio').html('');
            $("#selectfiltrosocio").append("<option value='-1'> Todos </option>");
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.nif_socio + "'> " + v.nome_socio + " </option>";
            });

            $("#selectfiltrosocio").append(options);

        }, error: function (err) {
            console.log('erro no select')
        }
    });


    $.ajax({
        url: '/instrutores',
        method: 'get',
        dataType: 'json',
        success: function (dados) {
            $('#selectfiltroinstrutor').html('');
            $("#selectfiltroinstrutor").append("<option value='-1'> Todos </option>");
            let options = $.map(dados, function (v, i) {
                return "<option value='" + v.nif + "'> " + v.nome + " </option>";
            });

            $("#selectfiltroinstrutor").append(options);

        }, error: function (err) {
            console.log('erro no select')
        }
    });


    $('#selectfiltrosocio').change(function (evt) {
        evt = evt ? evt : window.event;
        let nif = $(evt.target).val();
        alert(nif)
        let rota = (nif == -1) ? '/turmas/turmasAluno/' : '/turmas/turmasAluno/' + nif;

        $.ajax({
            url: rota,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                console.log(dados);
                showAlunosTurma(dados);
            }, error: function () {
                alert('erro na execução do filtro');
            }
        })

    });


    $('#selectfiltroinstrutor').change(function (evt) {
        evt = evt ? evt : window.event;
        let nif = $(evt.target).val();
        let rota = (nif == -1) ? '/turmas/turmasAluno/' : '/turmas/turmasProf/' + nif;

        $.ajax({
            url: rota,
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                console.log(dados);
                showAlunosTurma(dados);
            }, error: function () {
                alert('erro na execução do filtro');
            }
        })

    });














    


});

//--------------------------------------------------------------------- ACABA ONLOAD -------------------------------------------------------------------


function loadAlunosTurma() {
    try {
        $.ajax({
            url: '/turmas/turmasAluno/',
            method: 'get',
            dataType: 'json',
            success: function (dados) {
                console.log(dados);

                showAlunosTurma(dados);

            },
            error: function () {
                alert('error');


            }
        });

    } catch (error) {
        console.log(error)
    }
}

function showAlunosTurma(alunosturma) {

    let html = "";
    let result = $('#result');
    let pos = 0;
    $('#result').html('');
    for (let i of alunosturma) {
        pos++;
        html += "<tr>  <td>" + i.id_aula + " </td><td>" + i.modalidade + " </td> <td>" + i.nome + "</td><td>" + i.nif_socio + "</td> <td> " + i.nome_socio + "</td>   <td> " + btdelete(i.nif_socio, i.id_aula, pos) + "  </td></tr>";
    }
    result.append(html);


}


//------------------------------------------------------------------------------------ FUNCOES DOS BOTOES ----------------------------------------------------------------------
function deletealunoturma(nif_socio, id_aula, pos) {
    let myid = "#" + pos + 'del';
    $.ajax({
        url: '/turmas',
        method: 'delete',
        dataType: 'json',
        data: { nif_socio: nif_socio, id_aula: id_aula },
        success: function (dados) {
            $(myid).closest("tr").remove();
            console.log(dados);
        }, error: function (e) {
            console.log(e);
        }

    })
}







//----------------------------------------------------------------------------------  Botoes ------------------------------------------------------------------------------------
function btdelete(nif_socio, id_aula, pos) {
    let myid = pos + 'del';

    return " <input type='submit' id='" + myid + "' onclick='deletealunoturma(" + encodeURI(nif_socio) + "," + encodeURI(id_aula) + "," + encodeURI(pos) + ")'  name='btdel' class='btnk' value ='DEL'  />";
}

