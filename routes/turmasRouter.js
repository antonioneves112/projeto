var express = require('express');
var router = express.Router();
var turmasModel = require('../models/turmasModel');




router.get('/turmasAluno/', async function (req, res, next) {

    let result = await turmasModel.getTurmasAlunos();
    console.log(result);
    res.status(result.status).send(result.data);

})

router.get('/turmasAluno/:id', async function (req, res, next) {

    let nif_socio = req.params.id;
    console.log('xxxxx    ' + nif_socio);
    let result = await turmasModel.getTurmasAlunosId(nif_socio);
    console.log(result);
    res.status(result.status).send(result.data);

})

router.get('/turmasProf/:id', async function (req, res, next) {

    let nif = req.params.id;

    let result = await turmasModel.getTurmasAlunosInstrutor(nif);
    console.log(result);
    res.status(result.status).send(result.data);

})


router.get('/aulamodalidade/', async function (req, res, next) {

    let result = await turmasModel.getAllTurmasModalidade();
    console.log(result);
    res.status(result.status).send(result.data);

})


router.get('/socioaulas/', async function (req, res, next) {

    let result = await turmasModel.getAllTurmasSocioAula();
    console.log(result);
    res.status(result.status).send(result.data);

})




router.post('/', async function (req, res, next) {
    let turma = req.body;
    console.log()
    let result = await turmasModel.addSocioTurma(turma);
    res.status(result.status).send(result.data);
})


router.delete('/', async function (req, res, next) {
    let dados = req.body;
    let result = await turmasModel.deleteALunoTurma(dados.nif_socio, dados.id_aula);
    res.status(result.status).send(result.data);
    console.log(dados);


})



























module.exports = router;