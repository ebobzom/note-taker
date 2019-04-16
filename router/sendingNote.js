const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const UserModel = require('../db/mongodbModel').UserModel;

const sendingNote = async (req,res) => {
    //check if all fields are filled
    if(!req.body.note ){
        res.render('user',{msg: {
            firstName: ', please title and',
            lastName: 'note must be filled'
        }});
    }else{
       try {
           //find the user
            const userFromDB = await UserModel.findByIdAndUpdate(req.cookies.id,{$push: {
                messages: req.body.note
            }});

    
           const userContentFromDB = await UserModel.findById(req.cookies.id).lean().exec();
        
         userContentFromDB.notePath = `deleteNote/${req.body.note}`;

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