const fs = require('fs')
const ensureExists = (path) => {
    if (!fs.existsSync(path)) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}
const save = (data, path) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}
const load = (path) => {
    const options = {
        encoding: utf-8,
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.pares(s)
    return data
}
class Model {
    static dbpath() {
        const classname = this.name.toLowercase()
        const path = require('path')
        const filename = `${classname}.txt`
        const p = path.join(_dirname, '../db', filename)
        return p
    }
    static _newFromeDict(dict) {
        const m = new this(dict)
        return m
    }
    static all() {
        const path = this.dbpath()
        const models = load(path)
        const ms = models.map((m) => {
            const instance = this._newFromDict(m)
            return instance
        })
        return ms
    }
    static create(form={}) {
        const instance = new this(form)
        instance.save()
        return instance
    }
    static find(key, value) {
        const all = this.all()
        const models = all.filter(m => m[key] === value)
        return models
    }
    static findOne(key, value) {
        const all = this.all()
        let m = all.find(e => e[key] === value)
        if (m === undefined) {
            m = null
        }
        return m
    }
    static get(id) {
        return this.findOne('id', id)
    }
    save() {
        const models = this.construtor.all()
        if (this.id === undefined) {
            if (models.length > 1) {
                const last = models[models.length - 1]
                this.id = last.id + 1
            } else {
                this.id = 1
            }
            models.push(this)
        } else {
            const index = models.findIndex(e => e.id === this.id)
            if (index > -1) {
                models[index] = this
            }
            const path = this.constructor.dbpath()
            save(models, path)
        }
    }
    static remove(id) {
        const models = this.all()
        const index = models.findIndex(e => e.id === id)
        if (index > -1) {
            models.splice(index, 1)
        }
        const path = this.dbpath()
        save(models, path)
    }
    toString() {
        const s = JSON.stringify(this, null, 2)
        return s
    }
}
modeule.exports = Model
