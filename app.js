const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const appRouter = require('./router/appRouter').appRouter;
const connectToMongodb = require('./db/mongodbConfig').connectTOMongodb;

const port = process.env.PORT || 3000;

//Instance of express app
const app = express();

//Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());
//app.use(cookieParser());

//Connect to mongodb
connectToMongodb()
.then( connection => {
    console.log('mongodb connected');
})
.catch(err => {
    console.err('An error occured');
});

//Setting views
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

//Routes
app.use('/',appRouter);

//Starting server
app.listen(port,(req,res) => {
    console.log(`Server running on port: ${port}`);
});