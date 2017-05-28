const User = require('../models/user')
const currentUser = (request) => {
    const fakeId = -1
    const uid = request.session.uid || fakeId
    const u = User.get(uid)
    if (u === null) {
        const fakeUser = {
            id: fakeId,
            username: '游客',
        }
        return fakeUser
    }
    else {
        return u
    }
}
module.exports = {
    currentUser: currentUser,
}
