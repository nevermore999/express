const Model = require('./main')
class Todo extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.title = form.title || ''
        this.completed = form.completed || false
        const now = Date.now()
        this.ct = form.ct || now
        this.ut = form.ut || now
    }
    static update(form) {
        const id = Number(form.id)
        const t = Todo.get(id)
        t.title = form.title
        t.ut = Date.now()
        t.save()
        return t
    }
    static completed(id, completed) {
        const t = Todo.get(id)
        console.log('debug t', t)
        t.completed = completed
        t.save()
        return t
    }
}
module.exports = Todo
