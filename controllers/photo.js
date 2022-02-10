const {response, request} = require('express');

const {pool}= require('../database/config');



const postPhoto=async(req=request,res=response)=>{
     try {
        const {id_social_event}= req.body;
        const path=req.file.path
        const result = await pool.query('INSERT INTO photograph (path,upload_date, id_social_event) values ($1, CURRENT_DATE, $2 )', [path,id_social_event]);
        res.status(200).send('Fotografia anañadida');
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
}

const getPhotosByEvent=async(req=request,res=response)=>{
    console.log(req.get('host'));
    const id_social_event=req.params.id
    console.log(id_social_event);
    const result= await pool.query('SELECT * from photograph WHERE id_social_event=$1',[id_social_event]);
    res.status(200).json(result.rows);
}


module.exports={
    postPhoto,getPhotosByEvent
}