var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.send('PAGINA SOCIOS')
})


module.exports = router