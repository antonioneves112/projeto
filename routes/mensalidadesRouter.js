var express = require('express');
const moment = require('moment');
var router = express.Router();
var mensalidadesModel = require('../models/mensalidadesModel');



//ROTA PARA LISTAR AS MENSALIDADES
router.get('/', async function (req, res, next) {
    let result = await mensalidadesModel.listarMensalidades();
    res.status(result.status).send(result.data);

})

//ROTA PARA LISTAR AS MENSALIDADES
router.get('/', async function (req, res, next) {
    let result = await mensalidadesModel.listarMensalidades();
    res.status(result.status).send(result.data);

})


//ROTA PARA FILTRAR MENSALIDADE POR SOCIO
router.get('/:id', async function (req, res, next) {
    let nif = req.params.id;
    let result = await mensalidadesModel.FiltroMensalidadeSocio(nif);
    res.status(result.status).send(result.data);
    
})

//ROTA PARA FILTRAR MENSALIDADE POR ESTADO PAGAMENTO
router.get('/pagos/:id', async function (req, res, next) {
    let pago = req.params.id;
    let result = await mensalidadesModel.FiltroMensalidadePago(pago);
    res.status(result.status).send(result.data);
  
})

//ROTA PARA FILTRAR MENSALIDADE POR MES
router.get('/meses/:id', async function (req, res, next) {
    let mes = req.params.id;
    let result = await mensalidadesModel.FiltroMensalidadeMes(mes);
    res.status(result.status).send(result.data);
    
})

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
})


//ROTA PARA GERAR MENSALIDADES PARA TODOS OS SÓCIOS
router.post('/', async function (req, res, next) {
    let data = req.body;
    let result = await mensalidadesModel.callMensalidades(data.dia,data.mes,data.ano);
    res.status(result.status).send(result.data);
    
});




module.exports = router;


