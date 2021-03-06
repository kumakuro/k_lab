const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const nunjucks = require('nunjucks')
const session = require('cookie-session')
const bodyParser = require('body-parser')
// const sass = require('node-sass');

const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const index = require('./routes/index');
const users = require('./routes/users');
const todos = require('./routes/todos');

app.use('/', index);
app.use('/users', users);
app.use('/todos', todos);


// const apiTodo = require('./api/todo')
// const apiCate = require('./api/cate')
// app.use('/api/todo', apiTodo)
// app.use('/api/cate', apiCate)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
