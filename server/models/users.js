const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define user model
 const userSchema = Schema({
     email:{type:String,unique:true, required:true},
     password:String
});

//Create model Class
const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;