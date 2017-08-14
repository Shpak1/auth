/**
 * Created by Сергей on 14.08.2017.
 */
const mongoose = required('mongoose');
const Schema = mongoose.Schema;

//Define user model
 const userSchema = Schema({
     email:{type:String,unique:true},
     password:String
});

//Create model Class
const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;