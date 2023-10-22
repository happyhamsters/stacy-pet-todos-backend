require('dotenv').config()
const express = require('express')
const app = express()
const Card = require('./models/card')
const middleware = require('./utils/middleware')

app.use(middleware.requestLogger)

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