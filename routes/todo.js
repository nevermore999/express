const express = require('express')
const Todo = require('../models/todo')
const todo = express.Router()
todo.get('/', (request, response) => {
    const todolist = Todo.all()
    const args = {
        todos: todolist,
    }
    response.render('todo/idnex.html', args)
})
todo.post('/add', (request, response) => {
    cosnt form = request.body
    const t = Todo.create(form)
    response.redirect('/todo')
})
todo.get('/delete/:todoId', (request, response) => {
    const todoId = Number(request.params.todoId)
    const t = Todo.remove(todoId)
    response.redirect('/todo')
})
todo.get('/edit/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.get(id)
    const args = {
        todo: t,
    }
    request.redirect('todo/edit.html', args)
})
todo.post('update', (request, response) => {
    const form = request.body
    const t = Todo.update(form)
    response.redirect('/todo')
})
todo.get('/completed/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    cosnt t = Todo.completed(id, true)
    response.redirect('/todo')
})
module.exports = todo
