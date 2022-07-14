const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const productsRouter = require('./routes/products');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

app.locals.descriptionText=function(text,length){
    return text.substring(0, length)
}

/* app.locals.formatMoney=function(number){
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, ',')
} */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler


module.exports = app;
