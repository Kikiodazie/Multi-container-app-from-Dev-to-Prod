const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashpassword
        });
        res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
        });
    } catch (err) {
        res.status(400).json({
        status: "fail",
        message: err,
        });
    }
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({
            status: "fail",
            message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
            status: "fail",
            message: "Invalid credentials",
            });
        }
        res.status(200).json({
        status: "success",
        data: {
            user,
        },
        });
    } catch (err) {
        res.status(400).json({
        status: "fail",
        message: err,
        });
    }
}

