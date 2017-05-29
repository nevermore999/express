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
        encoding: 'utf-8',
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}
class Model {
    static dbpath() {
        const classname = this.name.toLowerCase()
        const path = require('path')
        const filename = `${classname}.txt`
        const p = path.join(__dirname, '../db', filename)
        return p
    }
    static _newFromeDict(dict) {
        const m = new this(dict)
        return m
    }
    //增加静态方法，判断obj1是否包含obj2
    static _contains = (obj1, obj2) => {
        let result = false
        for(let i in obj2) {
            if(obj1[i] && obj2[i]) {
                if (obj1[i] === obj2[i]) {
                    result = true
                }
            } else {
                return false
            }
        }
        return result
    }
    //增加静态方法，返回数据库中所有符合query的数据
    static fetch = (query) => {
        const models = this.all()
        const result = []
        for(let item in models) {
            if (this._contains(item, query)) {
                result.push(item)
            }
        }
    }
    static all() {
        const path = this.dbpath()
        const models = load(path)
        const ms = models.map((m) => {
            const instance = this._newFromeDict(m)
            return instance
        })
        return ms
    }
    static create(form={}) {
        const instance = new this(form)
        instance.save()
        return instance
    }
    //更新find方法
    static find(key, value) {
        if (typeof(key) === 'string') {
            return this.fetchBy(key, value)
        } else {
            return this.fetch(key)
        }
    }
    //增加fetchBy方法
    static fetchBy = (key, value) => {
        const all = this.all()
        const models = all.filter(m => m[key] === value)
        return models
    }
    //更新findOne方法
    static findOne(key, value) {
        const result = this.find(key, value)
        if (result.length > 0) {
            return result[0]
        } else {
            return null
        }
    }
    static get(id) {
        return this.findOne('id', id)
    }
    save() {
        const models = this.constructor.all()
        if (this.id === undefined) {
            console.log('debug this 1', this)
            if (models.length > 0) {
                const last = models[models.length - 1]
                this.id = last.id + 1
            } else {
                this.id = 1
                console.log('debug this', this)
            }
            models.push(this)
        } else {
            const index = models.findIndex(e => e.id === this.id)
            if (index > -1) {
                models[index] = this
            }
        }
        const path = this.constructor.dbpath()
        console.log('debug', models)
        save(models, path)
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
module.exports = Model
