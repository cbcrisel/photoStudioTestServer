const bcrypt = require('bcryptjs');
const {response, request} = require('express');
const {generateJWT} =require('../helpers/jwt');


const {pool}= require('../database/config');


const login =async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user= await pool.query('SELECT * FROM users WHERE users.email=$1',[email]);
        if(user.rowCount==0){
            return res.status(400).json({
                msg:'Usuario/ Contraseña no son correctos - correo'
            });
        }
        const validPassword= bcrypt.compareSync(password,user.rows[0].password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/ Contraseña no son correctos - password'
            });
        }
        const token = await generateJWT(user.rows[0].id);
        const logged=user.rows[0]
        res.json({
            logged,
            token
         })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
}


module.exports={
    login
}