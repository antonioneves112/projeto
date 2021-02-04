var express = require('express');

var router = express.Router();
var instrutoresModel = require('../models/instrutoresModel');




router.get('/', async function(req,res,next){
    let socios = await instrutoresModel.getAll();
    res.status(socios.status).send(socios.data);
});


router.post('/',async function(req,res,next){
    let instrutor = req.body;
    let result = await instrutoresModel.addInstrutor(instrutor);
    res.status(result.status).send(result.data);
});



router.get('/:id',async function(req,res,next){
    instrutor = req.params.id;
    let result = await instrutoresModel.getInstrutor(instructor);
    res.status(result.status).send(result.data)

})














module.exports = router;