const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())

const subscribers = [
        {
            subscriber_id:"dev.bpp.protocol-server.com",
            subscriber_url:"http://localhost:5000",
            type:"BPP",
            signing_public_key:"HFbozcBvm/RC/I2zMkVdwU0kGUXZXCY8WV38rt9upx4=",
            valid_until:new Date().toISOString()
        },
        {
            subscriber_id:"dev.bap.protocol-server.com",
            subscriber_url:"http://localhost:8000",
            type:"BAP",
            signing_public_key:"h3OHZGvQdeykp8C5LARTMDof798u8CAtSUZIj+XuWgQ=",
            valid_until:new Date().toISOString()
        }
    ]



app.post('/lookup', (req, res, next) => {
    let filtered_subscribers
    if(req.body.type) {
        filtered_subscribers = subscribers.filter(subscriber => subscriber.type === "BPP")
    }
    else if(req.body.subscriber_id) {
        filtered_subscribers = subscribers.filter(subscriber => req.body.subscriber_id === subscriber.subscriber_id)
    }
    res.status(201).json(filtered_subscribers)
})

app.listen(3000)