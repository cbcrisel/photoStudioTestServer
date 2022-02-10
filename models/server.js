const express = require('express');
const cors = require ('cors');
const bodyParser    = require('body-parser')

const {pool} = require ('../database/config');


class Server{
    constructor(){
        this.app = express();
        this.port=3000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use('/public',express.static('public'));
    }

     routes(){
        this.app.use(require('../routes/event'));
        this.app.use(require('../routes/user'));
        this.app.use(require('../routes/auth'));
        this.app.use(require('../routes/photo'));
    } 

    start(){
        this.app.listen(this.port,()=>{
            console.log('Servidor levantado en : ',this.port);
        });
    }

}

module.exports=Server;