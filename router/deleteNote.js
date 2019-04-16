/**
 * TODO
 * 1. retrive inner text
 * 2. once user clicks delete get messages all 
 * 3. loop over it and remove all occurance of inner text
 * 4. render the new array
 */

 const UserModel = require('../db/mongodbModel').UserModel;
 const deleteNote = async (req,res) => {
     //find messages array
     console.log(req.params.noteToDelete)
 }

 module.exports = {
     deleteNote
 }