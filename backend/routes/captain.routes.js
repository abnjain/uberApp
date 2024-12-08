const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");


router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min:2}).withMessage("First name must be at least 2 characters long"),
    body("fullName.lastName").isLength({min:2}).withMessage("Last name must be at least 2 characters long"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be atleast 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be atleast 3 characters long"),
    body("vehicle.capacity").isInt({min:1}).withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Password must be atleast 6 characters long"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    captainController.registerCaptain
);


module.exports = router;