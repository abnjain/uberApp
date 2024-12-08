const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
            minlength: [2, "First name must be atleast 2 characters."]
        },
        lastName: {
            type: String,
            minlength: [2, "Last name must be atleast 2 characters."]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be atleast 5 characters long."],
        match: [ /^\S+@\S+\.\S+$/, "Please enter a valid email" ]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: [ "active", "inactive" ],
        default: "inactive",
    },
    vehicle: {
        color: {
            type: String,
            requried: true,
            minlength: [3, "Color Must be atleast 3 Characters long."]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be atleast 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "Capacity must be atleast 1."]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"]
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }

});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;