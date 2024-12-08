const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema =  new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
            minlength: [2, "First name must be atleast 2 characters."]
        },
        lastName: {
            type: String,
            minlength: [2, "Last name must be atleast 2 characters."]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be atleast 5 characters long."]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;