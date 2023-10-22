require('dotenv').config()
const express = require('express')
const app = express()
const Card = require('./models/card')


// let cards = [
//   ...
// ]

app.get('/', (request, response) => {
  Card
    .find({})
    .then(cards => {
      response.json(cards)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})