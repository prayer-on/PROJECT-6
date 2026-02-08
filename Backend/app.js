// MONGODB PW: honCew-tiwguw-7vurxy 
// MONGODB CONNECTION: mongodb+srv://Prayer:<db_password>@cluster0.6cw2olg.mongodb.net/?appName=Cluster0 

const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

// DATABASE CONNECTION ⬇️
mongoose.connect('mongodb+srv://Prayer:honCew-tiwguw-7vurxy@cluster0.6cw2olg.mongodb.net/?appName=Cluster0')
.then(() => {
console.log('Successfully connected to MongoDB Atlas!')
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.log(error);
});

// BODY PARSER ⬇️
app.use(express.json());


// CORS ⬇️
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images/', express.static(path.join(__dirname, 'images')))
app.use('/api/books', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;