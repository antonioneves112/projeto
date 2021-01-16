var express = require('express');
var router = express.Router();


router.get('/modalidades',function(req,res){
    res.send('<h1> MODALIDADES </h1>');
})


module.exports = router;