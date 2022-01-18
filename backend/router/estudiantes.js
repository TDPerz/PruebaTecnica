const express = require('express')
const db = require('../DB/DB')
const routes = express.Router();

routes.get('/estudiantes', (req, res)=>{
    db.query("SELECT * FROM estudiantes", (err, result)=>{
        if(err) throw err
        res.json({status:0, message:"Get Ok!", data:result})
    })
})

routes.post('/estudiantes', (req, res)=>{
    var {nombre, telefono, correo} = req.body
    db.query(`INSERT INTO estudiantes (nombre, telefono, correo) VALUES ('${nombre}','${telefono}','${correo}')`, (err)=>{
        if(err){ 
            console.log(err)
            res.json({status: -1, message:"Post ERROR!"})
            return
        }
        res.json({status:0, message:"Post OK!"})
    })
})

routes.put('/estudiantes/:id', (req, res)=>{
    var {nombre, telefono, correo} = req.body
    db.query(`UPDATE estudiantes SET nombre='${nombre}',telefono='${telefono}',correo='${correo}' WHERE id='${req.params.id}'`, (err)=>{
        if(err){
            console.log(err)
            res.json({status:-1, message:"Put ERROR!"})
            return
        }
        res.json({status:0, message:"Put OK!"})
    })
})

routes.delete('/estudiantes/:id', (req, res)=>{
     db.query(`DELETE FROM estudiantes WHERE id=${req.params.id}`, (err)=>{
         if(err){
             console.log(err)
             res.json({status:-1, message:"Delete ERROR!"})
             return
         }
         res.json({status:0, message:"Delete OK!"})
     })
})

module.exports = routes