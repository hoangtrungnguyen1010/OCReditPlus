var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({

    name: String,

    email: {
        type: String,
        required: true},

    password: {
        type: String,
        required: true},

    avatar: String

});
 
var User = mongoose.model('UserTKPM', userSchema);
 
module.exports = User;