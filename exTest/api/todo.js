const express = require('express')

const Todo = require('../models/todo')
const Model = Todo
const { jsonResponse } = require('./main')

const router = express.Router()

router.post('/all', (req, res) => {
  const ms = Model.all()
  console.log('debug ms', req, res)
  const dict = {
    success: true,
    data: ms,
    message: ''
  }
  jsonResponse(req, res, dict)
})

router.post('/add', (req, res) => {
  const form = request.body
  console.log('debug body', form)
  const m = Model.create(form)
  const dict = {
    success: true,
    data: m,
    message: ''
  }
  jsonResponse(req, res, dict)
})

module.exports = router