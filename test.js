const path = require('path');
const express = require('express');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const body = require('body-parser');

const app = express();
const router = express.Router();

var logger = function(request,response,next){
  console.log('Request : '+request.url 
  + ' , Method : '+ request.method , ' , Logging .');
  next();
};

app.use(logger);
app.set('view engine','ejs');
app.use(body.json());
app.use(body.urlencoded({
    extended : false
}));

app.use(expressValidator({
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

const database = ['test'];

app.use('/data',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'testview'));

app.get('/',function(request,response){
    response.render('index',{data:database});
});
app.post('/',body.urlencoded({extended : false}),function(request,response){
    database.push(request.body.input);
});
// requires ajax (not included);
app.delete('/:data',function(request,response){
    database.splice(request.params.data);
});
let port = 8080;
app.set('port',process.env.PORT || port);
app.listen(app.get('port'), function() {
    console.log('App listening on port 8080');
});