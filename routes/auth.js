const {Router}= require('express');


const { login } = require('../controllers/auth');




const router= Router();

router.post('/api/login',login);


module.exports= router;
