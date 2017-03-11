let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Name: String,
    PhoneNum: String,
    Email: String
},
{
  collection: "contacts"
});

module.exports = mongoose.model('contacts', gamesSchema);
