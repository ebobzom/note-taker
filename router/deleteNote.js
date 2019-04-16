/**
 * TODO
 * 1. find user for DB 
 * 2. loop over messages array and remove all occurance of value passed by request URL
 * 3. render the new array
 */

 const UserModel = require('../db/mongodbModel').UserModel;

 const deleteNote = async (req,res) => {
     //find messages array 
    const userFromDB = await UserModel.findById(req.cookies.id).lean().exec();

    //delete message fro DB 
    const newMessagesArray = userFromDB.messages.filter((message,index,arr) => {
        return message.split(' ').join('') !== req.params.noteToDelete;
    });

    //Update DB with new array
    const modifiedMessagesArrayInDB = await UserModel.findByIdAndUpdate(req.cookies.id,{messages: newMessagesArray},{upsert: true, new: true})
    .lean()
    .exec();

    //Render new messages from DB to User
    res.render('user',{msg: modifiedMessagesArrayInDB});
}

 module.exports = {
     deleteNote
 }