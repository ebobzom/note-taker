const appRouter  = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const UserModel = require('../db/mongodbModel').UserModel;

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
                            }else{
                                res.render('user',{msg: newUser});
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

//Verifying a new User
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
                /**
                 * TODO
                 * generate a token 
                 * send it through a cookie
                 * create routes for logout
                 * work on user UI
                 */
                // 1. Create token
                const token = jwt.sign({
                    id: foundUser[0]._id,
                    token: token,
                    verifiedUser: true
                },'123456789',{expiresIn: '2 hours'});
                
                //Sending jwt token to user browser
                res.cookie('user',token);
                res.cookie('id', foundUser[0]._id);
                res.render('user',{msg: foundUser[0]});
            }
            
        } catch (error) {
            res.render('login',{msg: 'An error occured, please try again'})
        }

    }else{
        res.render('login',{msg: 'please all fields must be filled'});
    }
});

//Sending notes
appRouter.post('/notes', (req,res) => {
    if(!req.body.title && !req.body.note ){
        res.render('user',{msg: {
            firstName: ', please title and',
            lastName: 'note must be filled'
        }});
    }else{
        if(!jwt.verify(req.cookies.token,'123456789')){
            res.render('user',{msg: {
                firstName: 'Please try',
                lastName: 'try again'
            }})
        }
        //find the user
        const userFromDB = UserModel.findById(req.cookie.id,(err,user) => {
            if(err){
                res.render('user',{msg: {
                    firstName: ', An',
                    lastName: 'error ocurred please try again'
                }});
            }
        }).lean().exec();



    }
});

module.exports = {
    appRouter
}