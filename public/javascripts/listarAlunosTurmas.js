
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
    try {
        pos = 0;
        let linhas = $.map(turma, function (v, i) {
            pos++;
            return `<tr><td>${v.id_aula}</td><td>${v.modalidade}</td><td>${v.nome}</td><td>${v.nome_socio}</td><td>${deleteB(v.nif_socio, v.id_aula, v.pos)}</td></tr>`
        })
        $("#result").append(linhas);
    } catch (error) {
        console.log(error);
    }
}


function deleteB(nif_socio, id_aula, pos) {
    let myid = pos + 'del';
    return `<input type='button' id='${myid}' class='btnk' value='DEL' onclick='deletarAlunoTurma(${encodeURI(nif_socio), encodeURI(id_aula), encodeURI(pos)})' />`
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
                alert('aluno eliminado da turma com sucesso');
                $(myid).closest('tr').remove();
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
                    return `<option value='${v.nif_socio}'> ${v.nome_socio}</option>`;
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
                    return `<option value='${v.nif}'> ${v.nome} </option>`
                });
                $("#selectfiltroinstrutor").append(options);
            }, error: function () {
                alert('erro no select instrutor')
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
            $("#result").html('');
            $('#selectfiltroinstrutor option').eq(0).prop('selected', true);
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
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
            $("#result").html('');
            $('#selectfiltrosocio option').eq(0).prop('selected', true);
            await $.ajax({
                url: rota,
                method: 'get',
                dataType: 'json',
                success: function (dados) {
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

