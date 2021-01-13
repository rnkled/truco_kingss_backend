const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }, role: {
        type: String,
        default: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


const User = model('User', UserSchema);

module.exports = User;