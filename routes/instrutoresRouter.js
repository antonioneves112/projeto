var express = require('express');
var router = express.Router();
var instrutoresModel = require('../models/instrutoresModel');


router.get('/', async function (req, res, next) {
    let result = await instrutoresModel.getTodosInstrutores();
    res.status(result.status).send(result.data);
    console.log('cheguei a rota');
});


router.get('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await instrutoresModel.getInstrutor(nif);
    res.status(result.status).send(result.data);
    console.log('cheguei a rota');
});

router.get('/instrutoreshome/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await instrutoresModel.getTodosInstrutoresHome(nif);
    res.status(result.status).send(result.data);
    console.log('cheguei a rota');
});



router.post('/', async function (req, res, next) {
    let instrutor = req.body
    let result = await instrutoresModel.addInstrutor(instrutor);
    res.status(result.status).send(result.data);
    console.log('cheguei a rota criar instrutor');
    console.log(result);
});

router.put('/', async function (req, res, next) {
    let instrutor = req.body;
    let result = await instrutoresModel.updateInstrutor(instrutor);
    res.status(result.status).send(result.data);
    console.log('cheguei a rota criar instrutor');
    console.log(result);
});

router.delete('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await instrutoresModel.eliminaInstrutor(nif);
    res.status(result.status).send(nif);
    console.log('cheguei a rota eliminar');
})



module.exports = router;

