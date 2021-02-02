var express = require('express');
var router = express.Router();
var sociosModel = require('../models/sociosModel');


router.get('/',async function(req,res,next){
        let socios = await sociosModel.getAllSocios();
        res.status(socios.status).send(socios.data)
});


router.post('/',async function(req,res,next){
      
        let socio = req.body;
        let result = await sociosModel.registaSocio(socio);
        res.status(result.status).send(result.data);
     
});







module.exports = router;