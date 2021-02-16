// ===============================================================  ROTAS PARA OS SÓCIO =============================================================================================
var express = require('express');
var router = express.Router();
//SERVE PARA IMPORTAR AS FUNÇÕES QUE SE ENCONTRAM NO SOCIOSMODEL.JS
var sociosModel = require('../models/sociosModel');

//ROTA PARA LISTAR SÓCIOS
router.get('/', async function (req, res, next) {
        let socios = await sociosModel.getAllSocios();
        res.status(socios.status).send(socios.data);
});

//ROTA RETORNAR UM SOCIO
router.get('/:id', async function (req, res, next) {
        let nif_socio = req.params.id;
        let result = await sociosModel.getSocio(nif_socio);
        res.status(result.status).send(result.data)
})

//ROTA RETORNAR UM SOCIO DE UMA TURMA
router.get('/turmas/:id', async function (req, res, next) {
        let nif = req.params.id;
        let result = await sociosModel.getAlunoTurma(nif);
        res.status(result.status).send(result.data)
})

//ROTA PARA CRIAR SÓCIOS
router.post('/', async function (req, res, next) {
        let socio = req.body;
        let result = await sociosModel.addSocio(socio);
        res.status(result.status).send(result.data);
});

//ROTA PARA ATUALIZAR SÓCIO
router.put('/', async function (req, res, next) {
        let socio = req.body;
        let result = await sociosModel.updateSocio(socio);
        res.status(result.status).send(result.data);
});

//APAGAR SÓCIO
router.delete('/:id', async function (req, res, next) {
        let nif_socio = req.params.id;
        let result = await sociosModel.deleteSocio(nif_socio);
        res.status(result.status).send(nif_socio);
})

module.exports = router;

