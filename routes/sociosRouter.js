// ===============================================================  ROTEADOR SÓCIO =============================================================================================


var express = require('express');
var router = express.Router();
var sociosModel = require('../models/sociosModel');

//ROTA PARA LISTAR SÓCIOS
router.get('/',async function(req,res,next){
        let socios = await sociosModel.getAllSocios();
        res.status(socios.status).send(socios.data);
});


//ROTA RETORNAR UM SOCIO
router.get('/:id', async function(req,res,next){
        let nif_socio = req.params.id;
        let result = await sociosModel.getSocio(nif_socio);
        res.status(result.status).send(result.data)
        
})




//ROTA PARA CRIAR SÓCIO
router.post('/',async function(req, res, next){
        let socio = req.body;
        let result = await sociosModel.addSocio(socio);
        res.status(result.status).send(result.data);
});


//ROTA PARA ATUALIZAR SÓCIO
router.put('/',async function(req, res, next){
        let socio = req.body;
        let result = await sociosModel.updateSocio(socio);
        res.status(result.status).send(result.data);
});



router.delete('/:id',async function(req,res,next){
        let nif_socio = req.params.id;
        let result = await sociosModel.deleteSocio(nif_socio);
        res.status(result.status).send(nif_socio);
        console.log('chegamos a rota');
})








module.exports = router;

