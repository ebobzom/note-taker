const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const UserModel = require('../db/mongodbModel').UserModel;

const sendingNote = (req,res) => {
    //check if all fields are filled
    if(!req.body.title && !req.body.note ){
        res.render('user',{msg: {
            firstName: ', please title and',
            lastName: 'note must be filled'
        }});
    }else{
        console.log(req.cookies)
        //find the user
        const userFromDB = UserModel.findByIdAndUpdate(req.cookies.id,{$push: {
            messages: 'anjsjsjjs'
        }}).lean().exec();
        console.log(userFromDB)
    }
}
module.exports = {
    sendingNote
};