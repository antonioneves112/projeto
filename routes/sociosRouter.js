// ===============================================================  ROTEADOR SÓCIO =============================================================================================


var express = require('express');
var router = express.Router();
var sociosModel = require('../models/sociosModel');


router.get('/',async function(req,res,next){
        let socios = await sociosModel.getAllSocios();
        res.status(socios.status).send(socios.data);
});


//RETORNA UM SOCIO
router.get('/:id', async function(req,res,next){
        let nif_socio = req.params.id;
        let result = await sociosModel.getSocio(nif_socio);
        res.status(result.status).send(result.data)
        console.log(result.data);
})


router.post('/',async function(req, res, next){
        let socio = req.body;
        let result = await sociosModel.addSocio(socio);
        res.status(result.status).send(result.data);
});

router.put('/',async function(req, res, next){
        let socio = req.body;
        let result = await sociosModel.updateSocio(socio);
        res.status(result.status).send(result.data);
});



router.delete('/:id',async function(req,res,next){
        let nif_socio = req.params.id;
        let result = await sociosModel.deleteSocio(nif_socio);
        res.status(result.status).send(result.data)
        console.log(result.data);
        console.log('merda'+ nif_socio);
})









module.exports = router;

