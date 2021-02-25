var express = require('express');
var router = express.Router();
var instrutoresModel = require('../models/instrutoresModel');


router.get('/', async function (req, res, next) {
    let result = await instrutoresModel.getTodosInstrutores();
    res.status(result.status).send(result.data);
   
});


router.get('/instrutoreshome/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await instrutoresModel.getTodosInstrutoresHome(nif);
    res.status(result.status).send(result.data);
   
});


router.get('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await instrutoresModel.getInstrutor(nif);
    res.status(result.status).send(result.data);
  
});

router.post('/', async function (req, res, next) {
    let instrutor = req.body
    let result = await instrutoresModel.addInstrutor(instrutor);
    res.status(result.status).send(result.data);
  
});

router.put('/', async function (req, res, next) {
    let instrutor = req.body;
    let result = await instrutoresModel.updateInstrutor(instrutor);
    res.status(result.status).send(result.data);
  
});

router.delete('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await instrutoresModel.deleteInstrutor(nif);
  
})



module.exports = router;

