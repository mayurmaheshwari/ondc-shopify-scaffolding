const express = require('express')
const axios = require('axios')

const app = express()

const ondc_search_json = {
    context:
        {
            domain:"retail",
            core_version:"0.9.3"
        },
    message:
        {
            item: {
                descriptor: {
                    name: "ABC Aata"
                }
            },
            fulfillment: {
                end: {
                    location: {
                        gps: "12.4535445,77.9283792"
                    }
                }
            }
        }
}

axios.post('http://localhost:8000/search', ondc_search_json)
    .then(res => {
        console.log(res.headers)
    })
    .catch(err => {
        console.log(err)
    })

app.listen(8080)