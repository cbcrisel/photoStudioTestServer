const {Router}= require('express');

const { postEvent, getEvent } = require('../controllers/event');
const { validateJWT } = require('../helpers/jwt');



const router= Router();

router.post('/api/event', [validateJWT],postEvent);
router.get('/api/events', [validateJWT], getEvent);

module.exports= router;
