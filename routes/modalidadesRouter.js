var express = require('express');
var router = express.Router();
var modalidadeModel = require('../models/modalidadesModel');





//OBTER UMA MODALIDADE
router.get('/:id', async function(req,res,next){
    let id_modalidade = req.params.id;
    let result = await sociosModel.getModalidade(id_modalidade);
    res.status(result.status).send(result.data)
    
})



//OBTER TODAS AS MODALIDADES
router.get('/',async function (req,res,next){
    let result = await modalidadeModel.getAllModalidades();
    res.status(result.status).send(result.data);
    console.log('rota')

})

//INSERIR MODALIDADE
router.post('/',async function(req,res,next){
    let modalidade = req.body;
    let result= await modalidadeModel.addModalidade(modalidade);
    res.status(result.status).send(result.data);
})


//APAGAR MODALIDADE
router.delete('/:id',async function(req,res,next){
    let nif = req.params.id;
    let result= await modalidadeModel.deleteModalidade(nif);
    res.status(result.status).send(nif);
})









module.exports = router;