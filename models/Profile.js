const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Profiles', ProfileSchema);