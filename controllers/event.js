const {response, request} = require('express');


const {pool}= require('../database/config');


const postEvent=async(req=request,res=response)=>{
    try {
        const { name, description, id_user } = req.body;
        const result = await pool.query('INSERT INTO social_events (name, description) values ($1, $2)', [name, description]);
        const social_events= await pool.query('select social_events.id from social_events order by id desc LIMIT 1' );
        const id_social_event=social_events.rows[0].id;
        const post= 'CREADO'
        const result2 = await pool.query('INSERT INTO social_events_details (id_social_event, id_user, date, description) values ($1, $2, CURRENT_DATE, $3)',[id_social_event,id_user,post]);
    res.status(200).send('Event Created');
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }    
}

const getEvent=async(req=request,res=response)=>{
    const {id_user} = req.body
    const post= 'CREADO';
    const result = await pool.query('SELECT social_events.id,social_events.name FROM social_events, social_events_details, users WHERE social_events.id=social_events_details.id_social_event AND users.id = social_events_details.id_user  AND social_events_details.description=$1 AND users.id=$2',[post,id_user]);
    console.log( result.rows);
    res.status(200).json(result.rows);
}

module.exports={
    postEvent,getEvent
}