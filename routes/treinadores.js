var express  = require('express');
var router = express.Router();


router.use(function(req,res,next){
    console.log(req.url,"@",Date.now());
    next();
})

router.get('/',function(req,res){
    res.send('PAGINA DE TREINADORES')
})

module.exports = router