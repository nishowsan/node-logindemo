const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const express = require('express');

module.exports.getUser = function(username,callback){
    var get = {username : username};
    Account.find(get,callback);
};
module.exports.getPass = function(password,callback){
    var get = {password : password};
    Account.find(get,callback);
    console.log('okay');
};
module.exports.findById = function(id,callback){
    Account.findById(id,callback);
    console.log(id);
};
