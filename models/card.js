const mongoose = require('mongoose')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

  const cardSchema = new mongoose.Schema({
    title: String,
    text: String,
    isDone: Boolean
})
cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Card', cardSchema)