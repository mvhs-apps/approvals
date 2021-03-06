require('dotenv').config();

const PORT = process.env.PORT;

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(path.join('public', 'img', 'favicon.ico')));
app.use(express.static('public'));

app.use('/', require('./router'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.render('fourofour');
  res.status(400);
  // next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(PORT);
console.log('Listening on port ' + PORT);