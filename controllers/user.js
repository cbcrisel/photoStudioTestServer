const bcrypt = require('bcryptjs');
const {response, request} = require('express');


const {pool}= require('../database/config');

const getUsers=async(req, res=response)=>{
    const result= await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
}

const postUser= async (req=request,res=response)=>{
    console.log(req.body);
    const { fullname ,email ,password ,role_id } = req.body;
    /* const salt =bcrypt.genSaltSync();
    let pswd=bcrypt.hashSync(password,salt); 
    const result = await pool.query('INSERT INTO users (fullname, email, password, role_id) VALUES ($1, $2, $3, $4)',[fullname,email,pswd,role_id]);
    res.status(200).send('User Created'); */
}

const deleteUser= async (req=request, res=response)=>{
    const { id }=req.params;
    const result = await pool.query('DELETE  FROM users WHERE users.id=$1',[id]);
    res.status(200).send('User Deleted');
}


module.exports={
 getUsers, postUser, deleteUser
}