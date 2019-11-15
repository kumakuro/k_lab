const Model = require('./main')

class User extends Model {
  constructor(form = {}) {
    super();
    this.id = form.id
    this.username = form.username || ''
    this.password = form.password || ''
    this.node = form.note || ''
  }

  static findOne(key, value) {
    const all = this.all()
    let m = all.find((e) => {
      return e[key] === value
    })

    if (m === undefined) {
      m = null
    }

    return m
  }

  static get(id) {
    return this.findOne('id', id)
  }

  validateLogin() {
    const u = User.findOne({
      username: this.username
    })
    return u !== null && u.password === this.password
  }

  validateRegister() {
    const validForm = this.username.length > 2 && this.password.length > 2
    const uniqueUser = User.findOne('username', this.username) === null
    return validForm && uniqueUser
  }
}

module.exports = User