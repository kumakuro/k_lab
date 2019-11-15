const Model = require('./main')

class Topic extends Model {
  constructor(form = {}) {
    super()
    this.id = form.id;
    this.title = form.title || ''
    this.views = 0
    this.content = form.content || ''
    this.ct = Date.now()
    this.ut = this.ct
    this.user_id = form.user_id
  }

  static get(id) {
    const m = super.get(id)
    m.views += 1
    m.save()
    return m
  }

  static allList() {
    return super.all()
  }

  user() {
    const User = require('./user')
    const u = User.findOne('id', this.user_id)
    return u
  }

}