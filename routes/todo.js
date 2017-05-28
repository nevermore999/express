const express = require('express')
const Todo = require('../models/todo')
const todo = express.Router()
todo.get('/', (request, response) => {
    const todolist = Todo.all()
    const args = {
        todos: todolist,
    }
    response.render('todo/index.html', args)
})
todo.post('/add', (request, response) => {
    const form = request.body
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
    console.log('debug id', id)
    const t = Todo.get(id)
console.log('debug t', t)
    const args = {
        todo: t,
    }
    response.render('todo/edit.html', args)
})
todo.post('/update', (request, response) => {
    const form = request.body
    const t = Todo.update(form)
    response.redirect('/todo')
})
todo.get('/complete/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    console.log('debug id', id)
    Todo.completed(id, true)
    response.redirect('/todo')
})
module.exports = todo
