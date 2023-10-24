const app = require('./app')
const Todo = require('./models/todo')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.get('/', (request, response) => {
  Todo
    .find({})
    .then(todos => {
      response.json(todos)
    })
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})