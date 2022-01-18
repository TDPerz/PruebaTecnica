const express = require('express')
const db = require('../DB/DB')
const routes = express.Router();

routes.get('/maestros', (req, res)=>{
    db.query("SELECT * FROM maestros", (err, result)=>{
        if(err) throw err
        res.json({status:0, message:"Get Ok!", data:result})
    })
})

routes.post('/maestros', (req, res)=>{
    var {nombre, telefono, correo} = req.body
    db.query(`INSERT INTO maestros (nombre, telefono, correo) VALUES ('${nombre}','${telefono}','${correo}')`, (err)=>{
        if(err){ 
            console.log(err)
            res.json({status: -1, message:"Post ERROR!"})
            return
        }
        res.json({status:0, message:"Post OK!"})
    })
})

routes.put('/maestros/:id', (req, res)=>{
    var {nombre, telefono, correo} = req.body
    db.query(`UPDATE maestros SET nombre='${nombre}',telefono='${telefono}',correo='${correo}' WHERE id='${req.params.id}'`, (err)=>{
        if(err){
            console.log(err)
            res.json({status:-1, message:"Put ERROR!"})
            return
        }
        res.json({status:0, message:"Put OK!"})
    })
})

routes.delete('/maestros/:id', (req, res)=>{
     db.query(`DELETE FROM maestros WHERE id=${req.params.id}`, (err)=>{
         if(err){
             console.log(err)
             res.json({status:-1, message:"Delete ERROR!"})
             return
         }
         res.json({status:0, message:"Delete OK!"})
     })
})

module.exports = routes