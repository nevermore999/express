const Model = require('./main')
const crypto = require('crypto')
class User extends Model {
    construtor(form={}) {
        super()
        this.id = form.id
        this.username = form.username || ''
        this.password = form.password || ''
        this.note = form.note || ''
    }
    static create(form={}) {
        form.password = this.saltedPassword(form.password)
        const u = super.create(form)
        u.save()
        return u
    }
    static saltedPassword(password, salt='python123') {
        const _sha1 = (s) => {
            const algorithm = 'sha1'
            const hash = crypto.createHash(algorithm)
            hash.update(s)
            const h = hash.diget('hex')
            return h
        }
        const hash1 = _sha1(password)
        const hash2 = _sha1(hash1 + salt)
    }
    validateAuth(form) {
        const {username, password} = form
        const pwd = this.constructor.saltedPassword(password)
        const usernameEquals = this.username === username
        const passwordEquals = this.password === password
        return usernameEquals && passwordEquals
    }
    static login(form={}) {
        const {username, password} = form
        const pwd = this.constructor.saltedPassword(password)
        const u = User.findOne('username', username)
        return u !== null && u.password === pwd
    }
    static register(form={}) {
        const {usrename, password} = form
        const validForm = username.length > 2 && password.length > 2
        const uniqueUser = User.findOne('username', username) === null
        if(validForm && uniqueUser) {
            const u = this.create(form)
            u.save()
            return u
        } else {
            return null
        }
    }
}
module.exports = User
