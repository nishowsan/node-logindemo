// importing router
const express = require('express');
const router = express.Router();
const bodyParesr = require('body-parser');
const expressValditor = require('express-validator');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const login = require('../login/login.js');
const colors = require('colors');

mongoose.Promise = global.Promise;

// setting up paresr;
let parser = bodyParesr.urlencoded({
    extended : false
});

// setting up router;
router.get('/register',function(request,response){
    response.render('register');
});
router.get('/login',function(request,response){
    var get_name = request.body.login;
    var get_pass = request.body.password;
    response.render('login');
});

router.get('/logout',function(request,response){
    request.logout();
    response.redirect('/');
    console.log('[user]=> user logged out ...'.bgRed);
});

// setting up mongoose;
var schema = mongoose.Schema({
    username : {
        type:String,
        index:1
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});
var Account = mongoose.model('model',schema);

// posting data to the server;
router.post('/register',parser,function(request,response){
    var name = request.body.name;
    var userName = request.body.userName;
    var email = request.body.email;
    var password = request.body.password;
    var confirm = request.body.confirm;
    console.log(name);
    
    // validation
     request.checkBody('name','Name is required').notEmpty();
     request.checkBody('userName','Username is required').notEmpty();
     request.checkBody('email','Email is required').notEmpty();
     request.checkBody('password','Password is required').notEmpty();
     request.checkBody('confirm','Confirmation password is required').equals(request.body.password);
     var err = request.validationErrors();
     if(err){
         console.log(err);
         response.render('register',{
             error : err
         });
     }else{
         console.log('No errors');
         var hash = bcrypt.hashSync(password, 8);
         let password_hash = hash;
         var newAccount = new Account({
             name:name,
             email:email,
             username : userName,
             password : password,
             //password_hash : password_hash
         }).save(function(data){
             console.log(data);
             console.log('success');
        });
         request.flash('success_msg','Registration successful .');
         response.redirect('/users/login');
     }
});

router.post('/login',bodyParesr.urlencoded({
    extended : false
}),function(request,response,err){
    var get_name = request.body.login;
    var get_pass = request.body.password;
    console.log("[input]=>".bgYellow+" input name : ".green,get_name.bgGreen);
    console.log("[input]=>".bgYellow+" input password : ".green,get_pass.bgGreen);
    Account.find({},function(err,data){
        if(err) throw err;
        for(var i=0;i<data.length;i++){
            var user = data[i].username;
            var pass = data[i].password;
            console.log("[user]=>".bgYellow+" username : ".green,user.bgGreen);
            console.log("[user]=>".bgYellow+" password : ".green,pass.bgGreen);

        }
        if(get_name === user || get_pass === pass){
            response.render('dashboard');
            console.log('[user]=> user logged in ...'.green);
        }else{
            console.log(err);
            console.log('[err]=> error'.red);
            response.redirect('/');
        }
    });
});
// module exported;
module.exports = router;

