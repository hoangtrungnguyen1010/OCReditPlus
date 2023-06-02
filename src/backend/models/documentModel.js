var mongoose = require('mongoose');
 
var documentSchema = mongoose.Schema({

    user_uid: String,

    fileName: String,
    content: String
  

});
 
var Document = mongoose.model('documentTKPM', documentSchema);
 
module.exports = Document;