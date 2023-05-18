// //require the library
const mongoose = require("mongoose");
const db = 'mongodb://bhavyatiwari917:RZLuXvck0tTu1BgF@ac-w5rl1nr-shard-00-00.3eymiaz.mongodb.net:27017,ac-w5rl1nr-shard-00-01.3eymiaz.mongodb.net:27017,ac-w5rl1nr-shard-00-02.3eymiaz.mongodb.net:27017/codeial-node-app?ssl=true&replicaSet=atlas-wxt3nr-shard-0&authSource=admin&retryWrites=true&w=majority';

// //connect to the database
mongoose.connect(db);

// //acquire the connection to check if it is successful
const database = mongoose.connection;

// // error
database.on('error' , console.error.bind(console , "error connecting to db"));

// //up and running then print the message
database.once('open' , function(){
    console.log('Successfully connected to the database');
})

module.exports = database;

// const mongoose = require('mongoose');
// // const db = 'mongodb://bhavyatiwari917:RZLuXvck0tTu1BgF@ac-w5rl1nr-shard-00-00.3eymiaz.mongodb.net:27017,ac-w5rl1nr-shard-00-01.3eymiaz.mongodb.net:27017,ac-w5rl1nr-shard-00-02.3eymiaz.mongodb.net:27017/codeial-node-app?ssl=true&replicaSet=atlas-wxt3nr-shard-0&authSource=admin&retryWrites=true&w=majority';
// const database = mongoose.connect(db , {
//     useNewUrlParser: true,
// }).then(() => {
//     console.log('DB connection successfull');
// })

// module.exports = database;