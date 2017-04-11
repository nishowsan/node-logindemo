// importing modules;
const bcryptjs = require('bcryptjs');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const experssValidator = require('express-validator');
const path = require('path');
const passport = require('passport');
const Local = require('passport-local').Strategy;
var colors = require('colors');

// setting up database;
// please do not change the following
const mongodb = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp',function(){
  console.log('[db]conncetion is built ...'.bgGreen);
});
var conncetion = mongoose.connection;

// setting up app;
// main function and codes are down below
/*
   please do not change the following
   if you do not know what you are doing;
*/
const express  = require('express');
const app = express();

// setting up favicon;
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname , 'public','icon','favicon.ico')));

// importing parsers
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// custom middleware
var logger = function(request,response,next){
    console.log('=> '.bgGreen+'Request : '.green+request.url.bgGreen + ' , Method : '.green
    + request.method.bgGreen + ' , Logging ...'.green);
    next();
};
app.use(logger);

// setting up app;
app.set('views',path.join(__dirname , '/routes/views'));
app.set('view engine', 'ejs');

// bodyParser middleware;
var bodyJson = bodyParser.json();// lets you parse json data;
var parser = bodyParser.urlencoded({
    extended : false
});

app.use(bodyJson);
app.use(parser);

// cookieParser middleware;
var cookie = cookieParser();
app.use(cookie);

// express session;
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// working with other files;
const routes = require('./routes/index_routes');
const users = require('./routes/users');

// setting up public files;
let static_files = express.static(path.join(__dirname,'public'));
app.use('/data',static_files);

// setting up passport;
var passport_init = passport.initialize();
var passport_session = passport.session();
app.use(passport_init);
app.use(passport_session);

// express validator;
app.use(experssValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// setting up the flash;
const flash_connect = flash();
app.use(flash_connect);

// setting up global users;
app.use(function(request,response,next){
    response.locals.success_msg = request.flash('success_msg');
    response.locals.error_msg = request.flash('error_msg');
    response.locals.error = request.flash('error');
    next();
});

// setting up custom files;
// the routes configuration;
app.use('/',routes);
app.use('/users',users);

// execution of app;
var port = 8080;
app.set('port', (process.env.PORT || port));
app.listen(app.get('port'), function() {
    console.log('App listening on port : '.yellow + '8080'.red);
});
// end of codes
