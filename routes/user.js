const {Router}= require('express');

const {getUsers, postUser, deleteUser, postEvent2}= require('../controllers/user');


const router= Router();

router.get('/api/users',getUsers);
router.post('/api/user',postUser);
router.delete('/api/user/:id',deleteUser);


module.exports= router;

