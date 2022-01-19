require('dotenv').config()
const express = require('express')
const db = require('../DB/DB')
const routes = express.Router();

routes.post('/asignaciones', (req, res)=>{
    var {idMateria, idEstudiante} = req.body
    db.query(`INSERT INTO asignaciones (idMateria, idEstudiante) VALUES ('${idMateria}', '${idEstudiante}')`, (err)=>{
        if(err){ 
            console.log(err)
            res.json({status: -1, message:"Post ERROR!"})
            return
        }
        res.json({status:0, message:"Post OK!"})
    })
})

module.exports = routes