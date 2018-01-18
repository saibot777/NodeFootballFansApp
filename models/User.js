const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    fullname: { type: String, unique: true, default: '' },
    email: { type: String, unique: true },
    password: { type: String, default: '' },
    userImage: { type: String, unique: 'default.png' }
});

module.exports = mongoose.model('User', userSchema);