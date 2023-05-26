const mongoose = require('mongoose');
//COMMENTED OUT: these three modules are not installed and the below 3 lines cause program to crash!
//const validator = require('validator');
//const bcrypt = require('bcryptjs');
//const session = require('express-session');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'A user must have a name'],
      unique: true,
      //trim: true,
      maxlength: [15, 'A posted name cannot exceed 15 characters']
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'A password needs to have at least a length of 8'],
      select: false
    },

    age: {
      type: Number,
      min: 18,
      max: 30,
      required: [true, 'A user must input an age']
    },

    campus: {
      type: String,
      required: [true, 'A user must have a college']
    },

    gender: {
      type: String,
      required: [true, 'A user must have a gender']
    },

    major: {
      type: String,
      required: [true, 'A user must have a major']
    },

    aboutyou: {
      type: String,
      required: false,
      maxlength: [300, 'A description cannot exceed 300 characters']
    },

    pregender: {
      type: String,
      required: [true, 'A user must provide a preferrd biological gender']
    },

    picture: {
      data: Buffer,
      contentType: String
    }

    /*
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    passwordChangedAt: Date
    */
  });

// create a model, give it a name, and provide the schema to use
module.exports = mongoose.model('Users', userSchema);