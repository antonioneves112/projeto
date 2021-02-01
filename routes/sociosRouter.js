var express = require('express');
var router = express.Router();
var sociosModel = require('../models/sociosModel');


router.get('/', async function(res,req,next){
    let socios = await sociosModel.getAll();
    res.status(result.status).send(socios.data)
});















module.exports = router;