var express = require('express');
const moment = require('moment');
var router = express.Router();
var mensalidadesModel = require('../models/mensalidadesModel');




//ROTA PARA LISTAR AS MENSALIDADES
router.get('/', async function (req, res, next) {
    let result = await mensalidadesModel.listarMensalidades();
    console.log('ROTA LISTAR TODAS AS MENSALIDADES');
    console.log(result);
    res.status(result.status).send(result.data);

})



//ROTA PARA FILTRAR MENSALIDADE POR SOCIO
router.get('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await mensalidadesModel.getFiltroMensalidadeNome(nif);
    console.log('ROTA FILTRO SOCIOS')
    res.status(result.status).send(result.data);
    
})

//ROTA PARA FILTRAR MENSALIDADE POR ESTADO PAGAMENTO
router.get('/pagos/:id', async function (req, res, next) {
    let pago = req.params.id;
    let result = await mensalidadesModel.getFiltroMensalidadePago(pago);
    res.status(result.status).send(result.data);
    console.log('ROTA FILTRO PAGOS')
})

//ROTA PARA FILTRAR MENSALIDADE POR MES
router.get('/meses/:id', async function (req, res, next) {
    let mes = req.params.id;
    let result = await mensalidadesModel.getFiltroMensalidadeMes(mes);
    console.log('ROTA FILTRO MES');
    res.status(result.status).send(result.data);
    
})

//ROTA PARA GERAR MENSALIDADES PARA TODOS OS SÓCIOS
router.post('/', async function (req, res, next) {
    let data = req.body;
    let result = await mensalidadesModel.criamensalidades(data.dia,data.mes,data.ano);
    res.status(result.status).send(result.data);
    console.log('ROTA PARA FAZER  CALL DAS MENSALIDADES');
});



//ROTA PARA ADICIONAR UMA NOVA MENSALIDADE
router.post('/add', async function (req, res, next) {
    let mensalidade = req.body;
    let result = await mensalidadesModel.addMensalidade(mensalidade);
    res.status(result.status).send(result.data);
});


//ROTA PARA EDITAR UMA MENSALIDADE
router.put('/', async function (req, res, next) {
    let mensalidade = req.body;
    let result = await mensalidadesModel.editMensa(mensalidade);
    res.status(result.status).send(mensalidade);

})

//ROTA PARA ELIMINAR UMA MENSALIDADE
router.delete('/:id', async function (req, res, next) {
    let id_mensalidade = req.params.id;
    let result = await mensalidadesModel.deletaMensalidade(id_mensalidade);
    res.status(result.status).send(id_mensalidade);
    console.log('cheguei Rota');
})







module.exports = router;

