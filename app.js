const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const {secretKey} = require('./config')
const todo = require('./routes/todo')
const index = require('./routes/index')
const app = express()
app.user(bodyParser.urlencoded({
    extended: true,
}))
app.user(session({
    secret: secretKey,
}))
numjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})
const asset = __driname + '/static'
app.use('/static', express.static(asset))
app.use('/', index)
app.use('/todo', todo)
const run = (port = 3000, host = '') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        host = address.address
        port = address.port
        console.log(`listen server at http://${host}:${port}`)
    })
}
if(require.main === module) {
    run(4000, '0.0.0.0')
}
