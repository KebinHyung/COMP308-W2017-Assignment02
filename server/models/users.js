// require modules for our User Model
let mongoose = require('mongoose');
let Schema = mongoose.Schema; //alias for mongoose Schema
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
  Name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name is required'
  },
 /* password: {
    type: String,
    default: '',
    trim: true,
    required: 'password is required'
  },*/
  email: {
    type: String,
    default: '',
    trim: true,
    required: 'email is required'
  },
  PhoneNum: {
    type: String,
    default: '',
    trim: true,
    required: 'Phone Number is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
},{
  collection: "users"
});

let options = ({missingPasswordError: "Wrong Password"});

UserSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('User', UserSchema);