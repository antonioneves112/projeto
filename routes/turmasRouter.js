var express = require('express');
var router = express.Router();
var turmasModel = require('../models/turmasModel');



router.get('/', async function (req, res, next) {
    let result = await turmasModel.getListagemAlunosTurma();
    console.log('chegamos a rota sacar alunos turmas')
    res.status(result.status).send(result.data);

})

router.get('/filtroprof/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await turmasModel.filtroInstrutor(nif);
    console.log('chegamos a rota sacar alunos turmas filtro socios');
    res.status(result.status).send(result.data);

})

router.get('/filtrosocio/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await turmasModel.filtroSocio(nif);
    console.log('chegamos a rota sacar alunos turmas filtro prof');
    res.status(result.status).send(result.data);

})




router.get('/selectidAula/', async function (req, res, next) {
    let result = await turmasModel.selectIdaula();
    console.log('chegamos a rota selectidaula');
    res.status(result.status).send(result.data);

})

router.post('/', async function (req, res, next) {
    let socioturma = req.body;
    let result = await turmasModel.addSocioTurma(socioturma);
    console.log('chegamos a rota adicionar alunos na turma');
    res.status(result.status).send(result.data);

})



router.delete('/', async function (req, res, next) {
    let dados = req.body;
    let result = await turmasModel.apagaDaTurma(dados.nif_socio, dados.id_aula);
    console.log('chegamos a eliminar alunos da turma');
    res.status(result.status).send(result.data);

})




/*
//ROTA PARA RETURNAR ALUNOS DA TURMA
router.get('/turmasAluno/', async function (req, res, next) {
    let result = await turmasModel.getTurmasAlunos();
    res.status(result.status).send(result.data);
});

//ROTA PARA FILTRO POR SÓCIO
router.get('/turmasAluno/:id', async function (req, res, next) {
    let nif_socio = req.params.id;
    let result = await turmasModel.getTurmasAlunosId(nif_socio);
    console.log(result);
    res.status(result.status).send(result.data);
});

//ROTA PARA FILTRO POR INSTRUTOR 
router.get('/turmasProf/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await turmasModel.getTurmasAlunosInstrutor(nif);
    console.log(result);
    res.status(result.status).send(result.data);
});

//ROTA PARA MOSTRAR NO SEPARADOR TURMAS NO HOME OS ALUNOS DE CADA INSTUTOR
router.get('/aulamodalidade/', async function (req, res, next) {
    let result = await turmasModel.getAllTurmasModalidade();
    console.log(result);
    res.status(result.status).send(result.data);
});

//
router.get('/socioaulas/', async function (req, res, next) {
    let result = await turmasModel.getAllTurmasSocioAula();
    console.log(result);
    res.status(result.status).send(result.data);

});

//ROTA PARA INSERIR UM ALUNO NA TURMA
router.post('/', async function (req, res, next) {
    let turma = req.body;
    console.log()
    let result = await turmasModel.addSocioTurma(turma);
    res.status(result.status).send(result.data);
});

//ROTA PARA APAGAR SÓCIO DA TURMA
router.delete('/', async function (req, res, next) {
    let dados = req.body;
    let result = await turmasModel.deleteALunoTurma(dados.nif_socio, dados.id_aula);
    res.status(result.status).send(result.data);
});


*/
























module.exports = router;