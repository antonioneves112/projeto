var express = require('express');

var router = express.Router();

var turmasModel = require('../models/turmasModel');




router.get('/',async function(req,res,next){

    let result = await turmasModel.getTurmas();
    console.log(result);
    res.status(result.status).send(result.data);

})


router.delete('/:id_aula/:nif_socio',async function (req,res,next){
    let turma = {
        id_aula:req.params.id_aula,
        nif_socio:req.params.nif_socio
    }
  let result = await turmasModel.DeleteAlunoTurma(turma.nif_socio,turma.id_aula)
    res.send(turma);
})

































module.exports = router;