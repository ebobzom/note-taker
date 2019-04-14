const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../db/mongodbModel').UserModel;





const createNewUser = (req,res) => {
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
                                //send a jwt through a cookie and render
                                const token = jwt.sign({
                                    id: newUser._id,
                                    verifiedUser: true
                                },'123456789',{expiresIn: '2 hours'});
                                
                                res.cookie('id', newUser._id);
                                res.cookie('token', token);
                                res.render('user',{msg: newUser});
                            }
                        } );
                        
                    } catch (error) {
                        console.error(error);
                        //console.log('Duplicate already exist');
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

}

module.exports = {
    createNewUser
};