const mongoose = require('mongoose');

// Define the image schema
const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});


// Define the user schema and include the embedded image schema
const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'A user must have a name'],
      unique: true,
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
      type: imageSchema, // Embed the image schema as a property
      required: [true, 'A user must provide a picture']
    },

    comments: [],
  });

// create a model, give it a name, and provide the schema to use
//module.exports = mongoose.model('Users', userSchema);

// Create models based on the schemas
const User = mongoose.model('Users', userSchema);
const Image = mongoose.model('Images', imageSchema);

// Export the models
module.exports = {
  User,
  Image,
};
