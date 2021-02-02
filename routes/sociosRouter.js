// ===============================================================  ROTEADOR SÓCIO =============================================================================================


var express = require('express');
var router = express.Router();
var sociosModel = require('../models/sociosModel');


router.get('/',async function(req,res,next){
        let socios = await sociosModel.getAllSocios();
        res.status(socios.status).send(socios.data)
});


router.get('/:id', async function(req, res, next) {
        let nif_socio = req.params.id;
        let result = await albModel.getOne(nif_socio);
        res.status(result.status).
           send(result.data);
      });
      



router.post('/',async function(req, res, next){
        let socio = req.body;
        let result = await sociosModel.addSocio(socio);
        res.status(result.status).send(result.data);
});









module.exports = router;

