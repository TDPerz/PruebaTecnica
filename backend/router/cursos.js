const express = require('express')
const db = require('../DB/DB')
const routes = express.Router();

routes.get('/cursos', (req, res)=>{
    db.query("SELECT * FROM cursos", (err, result)=>{
        if(err) throw err
        res.json({status:0, message:"Get Ok!", data:result})
    })
})

routes.post('/cursos', (req, res)=>{
    var {nombre, creditos, horario, idprofesor, fechaCreacion} = req.body
    db.query(`INSERT INTO cursos (nombre, creditos, horario, idprofesor, fechaCreacion) VALUES ('${nombre}','${creditos}','${horario}','${idprofesor}','${fechaCreacion}')`, (err)=>{
        if(err){ 
            console.log(err)
            res.json({status: -1, message:"Post ERROR!"})
            return
        }
        res.json({status:0, message:"Post OK!"})
    })
})

routes.put('/cursos/:id', (req, res)=>{
    var {nombre, creditos, horario, idprofesor, fechaCreacion} = req.body
    db.query(`UPDATE cursos SET nombre='${nombre}',creditos='${creditos}',horario='${horario}',idprofesor='${idprofesor}', fechaCreacion'${fechaCreacion}' WHERE id='${req.params.id}'`, (err)=>{
        if(err){
            console.log(err)
            res.json({status:-1, message:"Put ERROR!"})
            return
        }
        res.json({status:0, message:"Put OK!"})
    })
})

routes.delete('/cursos/:id', (req, res)=>{
     db.query(`DELETE FROM cursos WHERE id=${req.params.id}`, (err)=>{
         if(err){
             console.log(err)
             res.json({status:-1, message:"Delete ERROR!"})
             return
         }
         res.json({status:0, message:"Delete OK!"})
     })
})

module.exports = routes