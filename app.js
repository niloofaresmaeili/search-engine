const express = require('express');
const bodyParser = require('body-parser');
const app = require('express')();
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const rfs = require('rotating-file-stream')
const indexRoute = require('./routes/index')
const process = require('process');
require('dotenv').config();
const cors = require('cors');



const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.get('/', (req, res) => { res.sendFile('public/index.html') });
app.use('/api', indexRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    console.error('get error : ',err)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
  
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))



