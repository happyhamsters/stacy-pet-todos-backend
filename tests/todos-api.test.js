const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Todo = require('../models/todo')

const {
    initialTodos,
    getAllTodosFromDb,
    getNonExistingId,
  } = require('../utils/test-helper');

const api = supertest(app)

beforeEach(async () => {
    await Todo.deleteMany({})
    let todoObject = new Todo(initialTodos[0])
    await todoObject.save()
    todoObject = new Todo(initialTodos[1])
    await todoObject.save()
})

describe('when there is initially some to-dos saved', () => {

test('to-dos are returned as json', async () => {
    await api
        .get('/api/todos')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all to-dos are returned', async () => {
    const response = await api.get('/api/todos')

    expect(response.body).toHaveLength(initialTodos.length)
})

test('a specific to-do is within the returned list', async () => {
    const response = await api.get('/api/todos')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Hello world!'
    )
})
test('to-dos have id', async () => {
    const response = await api.get('/api/todos');
    const { id } = response.body[0];
    expect(id).toBeDefined();
})
})

describe('viewing a specific to-do', () => {
    test('succeeds with a valid id', async () => {
      const todosAtStart = await getAllTodosFromDb()
  
      const todoToView = todosAtStart[0]
  
      const resultTodo = await api
        .get(`/api/todos/${todoToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      expect(resultTodo.body).toEqual(todoToView)
    })
  
    test('fails with statuscode 404 if to-do does not exist', async () => {
      const validNonexistingId = await getNonExistingId()
  
      await api
        .get(`/api/todos/${validNonexistingId}`)
        .expect(404)
    })
  
    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
  
      await api
        .get(`/api/todos/${invalidId}`)
        .expect(400)
    })
  })

describe('addition of a new to-do', () => {
test('succeeds with valid data', async () => {
    const testTodoData = {
        title: 'testTitle',
        text: 'testText'
    };
    await api
    .post('/api/todos')
    .send(testTodoData)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const todosAtEnd = await getAllTodosFromDb()
    expect(todosAtEnd).toHaveLength(initialTodos.length + 1)

    const contents = todosAtEnd.map((r) => r.title);
    expect(contents).toContain('testTitle');
})
test('fails with status code 400 if data is invalid', async () => {
    const newTodo = {
    }

    await api
      .post('/api/todos')
      .send(newTodo)
      .expect(400)

    const todosAtEnd = await getAllTodosFromDb()

    expect(todosAtEnd).toHaveLength(initialTodos.length)
  })
})

describe('deleting by id', () => {
    test('delete existing to-do', async () => {
      const todosAtStart = await getAllTodosFromDb();
      const todoToDelete = todosAtStart[0];
  
      await api.delete(`/api/todos/${todoToDelete.id}`).expect(204);
  
      const todosAtEnd = await getAllTodosFromDb();
  
      expect(todosAtEnd).toHaveLength(initialTodos.length - 1);
  
      const contents = todosAtEnd.map((r) => r.title);
  
      expect(contents).not.toContain(todoToDelete.title);
    });
    test('attempt to delete inexisting to-dos', async () => {
      const nonExistingId = await getNonExistingId();
      await api.delete(`/api/todos/${nonExistingId}`).expect(404);
  
      const todosAtEnd = await getAllTodosFromDb();
  
      expect(todosAtEnd).toHaveLength(initialTodos.length);
    });
  });
  
  describe('updating by id', () => {
    test('updating existing todo', async () => {
      const todosAtStart = await getAllTodosFromDb();
      const todoToUpdate = todosAtStart[0];
  
      const newTodoInfo = {
        title: 'testTitle',
        text: 'testText'
      };
  
      await api
        .put(`/api/todos/${todoToUpdate.id}`)
        .send(newTodoInfo)
        .expect(200);
  
      const todosAtEnd = await getAllTodosFromDb();
      const updatedtodo = todosAtEnd.find((b) => b.id === todoToUpdate.id);
  
      expect(todosAtEnd).toHaveLength(todosAtStart.length);
      expect(updatedtodo.title).toEqual(newTodoInfo.title);
    });
    test('attempt to update inexisting todos', async () => {
      const nonExistingId = await getNonExistingId();
      await api.put(`/api/todos/${nonExistingId}`).expect(404);
  
      const todosAtEnd = await getAllTodosFromDb();
  
      expect(todosAtEnd).toHaveLength(initialTodos.length);
    });
  });

afterAll(async () => {
    await mongoose.connection.close()
})