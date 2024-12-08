const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if (isCaptainAlreadyExist) {
        return res.status(400).json({message: "Captain Already Exist"});
    }

    const hashedPassword = await captainModel.hashPassword(password);
    
    const captain = await captainService.createCaptain ({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
};


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTU5MTdmZTA3M2MwOTU4YWYyYzk3NyIsImlhdCI6MTczMzY2MTA1NSwiZXhwIjoxNzMzNzQ3NDU1fQ.AJTVLD4RT6Ex2QComSbN51_Jm0KJvQOUnS1lo1c2d2Q