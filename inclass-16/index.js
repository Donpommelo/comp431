
const express = require('express')
const bodyParser = require('body-parser')

let articles = {articles:
        [{id:1, author:"Scott", body:'A post'},
        {id:2, author:"Charlos", body:'Another post'},
        {id:3, author:"Bodardus", body:'Decidedly not a post'}]};

let nextId = 3;

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     articles.articles.push({"id": nextId++, "author": "user", "body": req.body})  
     res.send(articles)
}

const getArticle = (req, res) => {
    console.log('Payload received', req.body)    
    res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', getArticle)
app.get('/', hello)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
