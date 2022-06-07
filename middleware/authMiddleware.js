const req = require("express/lib/request");

const protect = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in",
        });
    }

    next();
}

module.exports = protect;