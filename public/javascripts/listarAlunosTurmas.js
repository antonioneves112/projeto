
//----------------------------------------------------------- ONLOAD ---------------------------------------------------------------------------------------------------------------
$(function () {
    loadTurmas();
    preencheSelectSocios();
    preencheSelectInstrutor();
    filtroPorSocio();
    filtroPorInstrutor();



});

// ------------------------------------------------------------------ ACABA ONLOAD -----------------------------------------------------------------------------------------------------

async function loadTurmas() {
    try {
        await $.ajax({
            url: '/turmas/',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (dados) {
                showAlunosTurmas(dados);
            }, error: function () {
                alert('erro no carregamento dos alunos das turmas');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function showAlunosTurmas(turma) {
    let html = '';
    let linhas = $('#result');
    pos = 0;
    for (let i of turma) {
        pos++;
        html += `<tr><td>${i.id_aula}</td><td>${i.modalidade}</td><td>${i.nome}</td><td>${i.nome_socio}</td><td>${deleteB(i.nif_socio, i.id_aula, pos)}</td></tr>`
    }
    linhas.html(html);
    corPago();


}


function deleteB(nif_socio, id_aula, pos) {
    let myid = pos + 'del';
    return " <input type='submit' id='" + myid + "' onclick='deletarAlunoTurma(" + encodeURI(nif_socio) + "," + encodeURI(id_aula) + "," + encodeURI(pos) + ")'  name='btdel' class='btnk' value ='DEL'>";
}


async function deletarAlunoTurma(nif_socio, id_aula, pos) {
    try {
        let confirma = confirm('Deseja realmente excluir aluno da turma )');
        if (!confirma) return false;
        let myid = '#' + pos + 'del';

        await $.ajax({
            url: '/turmas/',
            method: 'delete',
            dataType: 'json',
            data: { nif_socio: nif_socio, id_aula: id_aula },
            success: function (dados) {
                $(myid).closest('tr').remove();
                alert('aluno eliminado da turma com sucesso');
            }, error: function () {
                alert('erro ao eliminar aluno da turma');
            }
        })
    } catch (error) {
        console.log(error);
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
                $('#selectfiltrosocio').html('');
                $('#selectfiltrosocio').append("<option value='-1'> Todos </option>");
                let options = $.map(dados, function (v, i) {
                    return "<option value ='" + v.nif_socio + "'> " + v.nome_socio + " </option> ";
                });
                $('#selectfiltrosocio').append(options);
            }, error: function () {
                alert('erro na recolha dos socios');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function preencheSelectInstrutor() {
    try {
        await $.ajax({
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
    } catch (error) {
        console.log(error);
    }
}


async function filtroPorSocio(show) {
    try {
        $('#selectfiltrosocio').change(async function (evt) {
            evt = evt ? evt : window.event;
            let nif = $(evt.target).val();
            let rota = (nif == -1) ? '/turmas/' : '/turmas/filtrosocio/' + nif;
            $('#selectfiltroinstrutor option').eq(0).prop('selected', true);
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
                    console.log(dados);
                    showAlunosTurmas(dados);
                }, error: function () {
                    alert('erro na execução do filtro');
                }
            })
        });

    } catch (error) {
        console.log(error);
    }
}

async function filtroPorInstrutor() {
    try {
        $('#selectfiltroinstrutor').change(async function (evt) {
            evt = evt ? evt : window.event;
            let nif = $(evt.target).val();
            let rota = (nif == -1) ? '/turmas/' : '/turmas/filtroprof/' + nif;
            $('#selectfiltrosocio option').eq(0).prop('selected', true);
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
                    console.log(dados);
                    showAlunosTurmas(dados);
                }, error: function () {
                    alert('erro na execução do filtro');
                }
            })
        });

    } catch (error) {
        console.log(error);
    }
}

function corPago() {
    $("tr").filter(function () {
        return $(this).find('td:eq(3)').text() == 1;
    }).css('background-color', 'rgba(76, 175, 80, 0.3)');
}