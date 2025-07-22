const express = require('express');
const cron = require('node-cron');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const schedule = () => {
    cron.schedule('* * * * * *', () => {
  
 });
}

schedule();

app.listen(process.env.PORT, () => {    
    console.log(`Server is running on port ${process.env.PORT}`);
});