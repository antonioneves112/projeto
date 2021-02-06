var express = require('express');

var router = express.Router();
var instrutoresModel = require('../models/instrutoresModel');



//ROTA PARA RECEBER TODOS OS INSTRUTORES
router.get('/', async function(req,res,next){
    let socios = await instrutoresModel.getAllInstrutores();
  
    res.status(socios.status).send(socios.data);
});


//ROTA PARA RECEBER UM INSTRUTOR
/*
router.get('/:id',async function(req,res,next){
    
    let nif= req.params.id;
    console.log(nif);
    let result = await instrutoresModel.getInstrutor(nif);
    res.status(result.status).send(result.data);
})
*/

router.get('/:id',async function(req,res,next){
    
    let nif= req.params.id;
    console.log(nif);
    let inst = await instrutoresModel.getInstrutor(nif);
    let modls=await instrutoresModel.getmodalidades();
    let mydata={instrutor:inst,modalidades:modls }
    res.status(inst.status).send(mydata);
})

//ROTA PARA INSERIR INSTRUTOR
router.post('/',async function(req,res,next){
    let instrutor = req.body;
    let result = await instrutoresModel.addInstrutor(instrutor);
    res.status(result.status).send(result.data);
});



//ROTA PARA ATUALIZAR UM INSTRUTOR
router.put('/',async function(req,res,next){
        let instrutor = req.body;
        let result = await instrutoresModel.updateInstrutor(instrutor);
        res.status(result.status).send(result.data);
})



router.delete('/:id',async function(req,res,next){
    let nif = req.params.id;
    let result = await instrutoresModel.deleteInstrutor(nif);
    res.status(result.status).send(nif);
})









module.exports = router;