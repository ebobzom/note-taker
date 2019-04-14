const appRouter  = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const UserModel = require('../db/mongodbModel').UserModel;

const createNewUser = require('./createNewUser').createNewUser;
const logUserIn = require('./logUserIn').logUserIn;
const sendNote = require('./sendingNote').sendingNote;

//Homepage
appRouter.get('/',(req,res) => {
    res.render('login',{msg: 'Welcome, please Login into your acount.'});
});

appRouter.get('/login',(req,res) => {
    res.render('login',{msg: 'Welcome, please Login into your acount.'});
});

//Signup page
appRouter.get('/signup',(req,res) => {
    res.render('signup', {msg: 'welcome please create an account'});
});

//creating a new user
appRouter.post('/signup',createNewUser);

//Verifying a new User
appRouter.post('/login', logUserIn);

//Sending notes
appRouter.post('/notes', sendNote);

module.exports = {
    appRouter
}