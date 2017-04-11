// importing router
const express = require('express');
const router = express.Router();

// setting up router;
router.get('/',function(request,response){
    response.render('index');
});

// module exported;
module.exports = router;