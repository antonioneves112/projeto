var express = require('express');
var router = express.Router();
var mensalidadesModel = require('../models/mensalidadesModel');


router.get('/',async function(req,res,next){

    let result = await mensalidadesModel.getMensalidades();

    res.status(result.status).send(result.data);
    console.log('ROTA')
})


router.post('/',async function (req,res,next){
    let mensalidade = req.body;
    let result = await mensalidadesModel.addMensalidade(mensalidade);
    res.status(result.status).send(result.data);
})

































module.exports = router;