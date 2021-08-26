// Requiring Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defining Schema
var userSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
  }
}, {
    timestamps: true,
  });

//Exporting the file
module.exports = mongoose.model('User', userSchema); //Binding schema toConvoCollection
