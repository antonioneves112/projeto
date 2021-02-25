var express = require('express');
var router = express.Router();
var turmasModel = require('../models/turmasModel');



router.get('/', async function (req, res, next) {
    let result = await turmasModel.getListagemAlunosTurma();
    res.status(result.status).send(result.data);

})

router.get('/filtroprof/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await turmasModel.filtroInstrutor(nif);
    res.status(result.status).send(result.data);

})

router.get('/filtrosocio/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await turmasModel.filtroSocio(nif);
    res.status(result.status).send(result.data);

})


router.get('/selectidAula/', async function (req, res, next) {
    let result = await turmasModel.selectIdaula();
    res.status(result.status).send(result.data);

})

router.post('/', async function (req, res, next) {
    let socioturma = req.body;
    let result = await turmasModel.addSocioTurma(socioturma);
    res.status(result.status).send(result.data);

})

router.delete('/', async function (req, res, next) {
    let dados = req.body;
    let result = await turmasModel.apagaDaTurma(dados.nif_socio, dados.id_aula);
    res.status(result.status).send(result.data);

})



module.exports = router;