require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./DB/DB')

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended : true}));



const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '8080'

app.get('/', (req, res )=>{
    res.json({state:0, message:"ok"})
})

app.use(require('./router/estudiantes'))

app.listen(port, host, ()=>{
    console.log('Servidor Iniciado!!')
})