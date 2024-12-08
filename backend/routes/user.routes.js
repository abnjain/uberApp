const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");


router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min:2}).withMessage("First name must be at least 2 characters long"),
    body("fullName.lastName").isLength({min:2}).withMessage("Last name must be at least 2 characters long"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    userController.registerUser
);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min:6 }).withMessage("Password must be atleast 6 characters long")
],
    userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);



module.exports = router;