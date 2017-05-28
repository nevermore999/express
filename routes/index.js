const express = require('express')
const User = require('../models/user')
const {currentUser} = require('./main')
const index = express.Router()
index.get('/', (request, response) => {
    const userList = User.all()
    const u = currentUser(request)
    const args = {
        users: userList,
        user: u,
    }
    response.render('index/index.html', args)
})
index.get('/login', (request, response) => {
    response.render('index/login.html')
})
index.post('/login', (request, response) => {
    const form = request.body
    console.log('debug form', form)
    const u = User.findOne('username', form.username)
console.log('debug u', u)
    if (u.validateAuth(form)) {
        console.log('debug request', request.session.uid)
        request.session.uid = u.id
        response.redirect('/')
    }
})
index.get('/register', (request, response) => {
    response.render('index/register.html')
})
index.post('/register', (request, response) => {
    const form = request.body
    console.log('debug form', form)
    const u = User.create(form)
    console.log('debug u', u)
    response.redirect('/')
})
index.get('/logout', (request, response) => {
    request.session = null
    response.redirect('/')
})
module.exports = index
