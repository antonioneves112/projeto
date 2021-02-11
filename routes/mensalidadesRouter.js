var express = require('express');
var router = express.Router();
var mensalidadesModel = require('../models/mensalidadesModel');


//ROTA PARA LISTAR AS MENSALIDADES
router.get('/',async function(req,res,next){
    let result = await mensalidadesModel.getMensalidades();
    res.status(result.status).send(result.data);
    console.log('ROTA')
})


//ROTA PARA ADICIONAR UMA NOVA MENSALIDADE
router.post('/',async function (req,res,next){
    let mensalidade = req.body;
    console.log()
    let result = await mensalidadesModel.addMensalidade(mensalidade);
    res.status(result.status).send(result.data);
})




router.delete('/:id',async function (req,res,next){
    let id_mensalidade = req.params.id;
    let result = await mensalidadesModel.deletaMensalidade(id_mensalidade);
    res.status(result.status).send(id_mensalidade);
    console.log('cheguei Rota');
})







module.exports = router;