const appRouter  = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const UserModel = require('../db/mongodbModel').UserModel;


appRouter.get('/',(req,res) => {
    res.render('login',{msg: 'Welcome, please Login into your acount.'});
});

appRouter.get('/signup',(req,res) => {
    res.render('signup', {msg: 'welcome please create an account'});
});

appRouter.post('/signup', (req,res) => {
    //check if all fields are filled
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.password){
    
        try {
            bcryptjs.genSalt(10,(err,salt) => {
                bcryptjs.hash(req.body.password,salt,(err,hash) => {
                    if(err){
                        res.render('signup',{msg: 'All fields must be filled'});
                    }
                    try {
                        //Attempt to send it to db
                        const newUser = UserModel.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        }, (err,newUser) => {
                            if(err){
                                res.render('signup',{msg: 'email or password already exist, please change'});
                            }
                        } );
                        
                        
                    } catch (error) {
                        console.log('Duplicate already exist');
                        //res.statusCode(401)
                        //res.render('signup',{msg: 'email and password already exist please change user name and password'})
                    }
                });
            });
               
        } catch (error) {
            res.render('signup',{msg: 'An error ocurred please check your internet connection and fill the form again'})
        }

    }else{
        res.render('signup',{msg: 'please all fields should be filled.'});
    }

});

appRouter.post('/login', async (req,res) => {
    //check if al fields are filled
    if(req.body.email && req.body.password){
        
        try {
            //check if user already exists
            const foundUser = await UserModel.find({
                email: req.body.email
            }).lean().exec();

            //if user doesn't exist 
            if(!foundUser[0]){
                res.render('login',{msg: 'Please create an account first'});
            }else{
                res.render('user',{msg: foundUser[0]});
            }
            
        } catch (error) {
            res.render('login',{msg: 'An error occured, please try again'})
        }

    }else{
        res.render('login',{msg: 'please all fields must be filled'});
    }
});


module.exports = {
    appRouter
}