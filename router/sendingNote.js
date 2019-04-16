const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const UserModel = require('../db/mongodbModel').UserModel;

const sendingNote = async (req,res) => {
    //check if all fields are filled
    if(!req.body.note ){
        res.render('user',{msg: {
            firstName: ', please all fields',
            lastName: 'must be filled'
        }});
    }else{
       try {
           
           //find the user and update messages in DB 
            const userFromDB = await UserModel.findByIdAndUpdate(req.cookies.id,{$push: {
                messages: req.body.note
            }});

            //find new updated messages
           const userContentFromDB = await UserModel.findById(req.cookies.id).lean().exec();
        
            // Render new DB values to user
          res.render('user',{
            msg: userContentFromDB
        });
           
       } catch (error) {
            console.error('An error has occured:',error);
       }
        
        
    }
}
module.exports = {
    sendingNote
};