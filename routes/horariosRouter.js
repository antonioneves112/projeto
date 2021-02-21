const express = require('express');
const router = express.Router();
const horariosModel = require('../models/horariosModel');

router.get('/', async function (req, res, next) {
    let result = await horariosModel.getHorarios();
    console.log('rota horario');
    res.status(result.status).send(result.data);
})

router.get('/home/:id', async function (req, res, next) {
    let horas = req.params.id;
    let result = await horariosModel.getHorariosHome(horas);
    console.log('rota horario');
    res.status(result.status).send(result.data);
})

router.post('/', async function (req, res, next) {
    let horario = req.body;
    let result = await horariosModel.addHorario(horario);
    console.log('rota horario add');
    res.status(result.status).send(result.data);
})


router.delete('/', async function (req, res, next) {
    let dados = req.body;
    let result = await horariosModel.apagaHorarios(dados.id_aula, dados.dia_semana);
    console.log('rota horario');
    res.status(result.status).send(result.data);
})

module.exports = router;