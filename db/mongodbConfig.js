const mongoose = require('mongoose');
const connect = (req,res) => {
    return mongoose.connect('mongodb://localhost:27017/notes',{useNewUrlParser: true});
};






module.exports = {
    connectTOMongodb: connect
};