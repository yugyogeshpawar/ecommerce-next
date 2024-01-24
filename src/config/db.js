const mongoose = require('mongoose');
const Connection = (username, password) => {
    
    const URL = 'mongodb+srv://jaylunagariya:Jay1501@cluster0.wp4chqh.mongodb.net/furniture'

    try{
        mongoose.connect(URL);
        console.log("=== Database Connected Successfully ===");
    } catch (error){
        console.log("Error in Database Connection", error);
    };
};

module.exports = {Connection};