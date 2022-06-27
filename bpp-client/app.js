const express = require('express')
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json())

//Routers
app.post('/', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({})
})

 app.post('/search', (req, res, next) => {
     console.log(req.body)
 })

app.listen(5050)



