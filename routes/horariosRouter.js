const express = require('express');
const router = express.Router();
const horariosModel = require('../models/horariosModel');

router.get('/', async function (req, res, next) {
    let result = await horariosModel.getHorarios();
    console.log('rota horario');
    res.status(result.status).send(result.data);
})

router.get('/home/:id/', async function (req, res, next) {
    let nif = req.params.id;
    let result = await horariosModel.getHorariosHome(nif);
    console.log('rota horario');
    res.status(result.status).send(result.data);
})


router.get('/select/', async function (req, res, next) {
    let result = await horariosModel.getselectsemana();
    console.log('rota horario');
    res.status(result.status).send(result.data);
})

router.get('/filtro/:id/', async function (req, res, next) {
    let semana = req.params.id;
    let result = await horariosModel.gethorariosFiltrados(semana);
    console.log('rota horario filtrados');
    res.status(result.status).send(result.data);
})

router.post('/', async function (req, res, next) {
    let horario = req.body;
    let result = await horariosModel.addHorario(horario);
    console.log('rota horario add');
    res.status(result.status).send(result.data);
})


router.delete('/:id', async function (req, res, next) {
    let id = req.params.id;
    let result = await horariosModel.apagaHorarios(id);
    console.log('rota horario');
    res.status(result.status).send(result.data);
})

module.exports = router;