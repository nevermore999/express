const Model = require('./main')
class Todo extends Model {
    construtor(form={}) {
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
        t.completed = completed
        t.svae()
        return t
    }
}
module.exports = Todo
