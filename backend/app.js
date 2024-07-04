var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var database = require('./routes/db');
const config = require("./config/config");

var adminRouter = require('./routes/admin/admin');
var teacherRouter = require('./routes/teacher/teacher');
var studentRouter = require('./routes/student/student');
const sessionController = require("./controllers/session.js");
const  viceChancellorRouter = require('./routes/viceChancellor/viceChancellor.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
/* GET sessions listing. */

app.get("/sessions", sessionController.findAll);


// // database
// const db = require("./models");
// db.sequelize.sync().then(() => {
//   // initial(); // Just use it in development, at the first time execution!. Delete it in production
// });

app.get('/', async (req, res) => {
  var sql = `select 
    (select count(*) from students) as students,
    (select count(*) from teachers) as teachers,
    (select count(*) from applications) as applications`;
    await database.query(sql, function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});

app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/vice-chancellor', viceChancellorRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
