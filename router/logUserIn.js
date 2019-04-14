const jwt = require('jsonwebtoken');
const UserModel = require('../db/mongodbModel').UserModel;

const logUserIn = async (req,res) => {
    //check if all fields are filled
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
                 * generate a token 
                 * send it through a cookie
                 * create routes for logout
                 * work on user UI
                 */
                // 1. Create token
                const token = jwt.sign({
                    id: foundUser[0]._id,
                    verifiedUser: true
                },'123456789',{expiresIn: '2 hours'});
                
                //Sending jwt token to user browser
                res.cookie('token',token);
                res.cookie('id', foundUser[0]._id);
                res.render('user',{msg: foundUser[0]});
            }
            
        } catch (error) {
            console.error(error);
            res.render('login',{msg: 'An error occured, please try again'})
        }

    }else{
        res.render('login',{msg: 'please all fields must be filled'});
    }
}

module.exports = {
    logUserIn
};