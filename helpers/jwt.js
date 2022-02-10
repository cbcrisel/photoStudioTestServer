const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const {pool}= require('../database/config');

const generateJWT = ( id = 0 ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, 'prueba123', {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const validateJWT=async(req= request, res=response,next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { id }= jwt.verify(token, 'prueba123');
        console.log(id);
        const result= await pool.query('SELECT users FROM users WHERE id=$1',[id]);
        const user= result.rows[0];
        console.log(user);
        if (!user){
            res.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            });
        }
        req.body.id_user=id
        console.log(req.body.id_user);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    generateJWT,
    validateJWT
}
