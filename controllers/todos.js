const todosRouter = require('express').Router()
const Todo = require('../models/todo')

todosRouter.get('/', (request, response) => {
    Todo.find({}).then(todos => {
    response.json(todos)
  })
})

todosRouter.get('/:id', (request, response, next) => {
    Todo.findById(request.params.id)
    .then(todo => {
      if (todo) {
        response.json(todo)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

todosRouter.post('/', (request, response, next) => {
  const body = request.body

  const todo = new Todo({
    title: body.title,
    text: body.text,
    isDone: false,
  })

  todo.save()
    .then(savedTodo => {
      response.json(savedTodo)
    })
    .catch(error => next(error))
})

todosRouter.delete('/:id', (request, response, next) => {
    Todo.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

todosRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const todo = {
    title: body.title,
    text: body.text,
    isDone: body.isDone || false,
  }
  Todo.findByIdAndUpdate(request.params.id, todo, { new: true })
    .then(updatedTodo => {
      response.json(updatedTodo)
    })
    .catch(error => next(error))
})

module.exports = todosRouter