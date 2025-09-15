const express = require('express')
const app = express()

app.use(express.json())

let filmes = [
  { id: 1, titulo: 'O Poderoso Chefão', diretor: 'Francis Ford Coppola', ano: 1972 },
  { id: 2, titulo: 'Pulp Fiction', diretor: 'Quentin Tarantino', ano: 1994 }
];


app.get('/api/filmes', (req,res)=>{
    res.json(filmes)
})

let nextId = 3

app.post('/api/filmes', (req,res)=>{
    const {titulo, diretor, ano} = req.body

    if(!titulo || !diretor || !ano){
        return res.status(400).json({
            error: 'Titulo, diretor e ano são obrigatorios'
        })
    }

    const novoFilme = {
        id: nextId++,
        titulo: titulo,
        diretor: diretor,
        ano: parseInt(ano)
    }

    filmes.push(novoFilme)
    res.status(201).json(novoFilme)
})

module.exports = app