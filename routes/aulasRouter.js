const express = require('express');
const router = express.Router();
const aulasModel = require('../models/aulasModel');


router.get('/', async function (req, res, next) {
    let result = await aulasModel.getAulas();
    res.status(result.status).send(result.data);

})


router.get('/horarios/', async function (req, res, next) {
    let result = await aulasModel.getAulasHorarios();
    res.status(result.status).send(result.data);

})

router.post('/', async function (req, res, next) {
    let aulas = req.body;
    let result = await aulasModel.addAula(aulas);
    console.log(aulas);
    res.status(result.status).send(result.data);


});

router.delete('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await aulasModel.apagaAula(nif);
    res.status(result.status).send(result.data);
})














module.exports = router;
