var express = require('express');
var router = express.Router();
var mensalidadesModel = require('../models/mensalidadesModel');


//ROTA PARA LISTAR AS MENSALIDADES
router.get('/',async function(req,res,next){
    let result = await mensalidadesModel.getMensalidades();
    res.status(result.status).send(result.data);
    console.log('ROTA')
})



router.get('/:id',async function(req,res,next){
    let nif = req.params.id;
    let result = await mensalidadesModel.getFiltroMensalidadeNome(nif);
    res.status(result.status).send(result.data);
    console.log('ROTA FILTRO')
})


router.get('/pagos/:id',async function(req,res,next){
    let pago = req.params.id;
    let result = await mensalidadesModel.getFiltroMensalidadePago(pago);
    res.status(result.status).send(result.data);
    console.log('ROTA PAGOS')
})


router.get('/meses/:id',async function(req,res,next){
    let mes = req.params.id;
    let result = await mensalidadesModel.getFiltroMensalidadeMes(mes);
    res.status(result.status).send(result.data);
    console.log('ROTA MES FILTRO')
})

router.post('/', async function(req,res,next){
    
    let dadosdoajax = req.body;
    console.log(dadosdoajax);
    let result = await mensalidadesModel.criamensalidades(dadosdoajax.data_vence);
    res.status(result.status).send(result.data);
   
    console.log('ROTA CALL MENSALIDADES')
});








//ROTA PARA ADICIONAR UMA NOVA MENSALIDADE
router.post('/',async function (req,res,next){
    let mensalidade = req.body;
    console.log()
    let result = await mensalidadesModel.addMensalidade(mensalidade);
    res.status(result.status).send(result.data);
})

router.put('/',async function(req,res,next){
    let mensalidade = req.body;
   let result = await mensalidadesModel.editMensa(mensalidade);
    res.status(result.status).send(mensalidade);
    
})



router.delete('/:id',async function (req,res,next){
    let id_mensalidade = req.params.id;
    let result = await mensalidadesModel.deletaMensalidade(id_mensalidade);
    res.status(result.status).send(id_mensalidade);
    console.log('cheguei Rota');
})







module.exports = router;