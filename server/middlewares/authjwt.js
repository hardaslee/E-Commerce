const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, resp, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return resp.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return resp.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, resp, next) => {
    try {
        const user = await User.findById(req.userId).exec();

        const roles = await Role.find({
            _id: { $in: user.roles },
        });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        resp.status(403).send({ message: "Require Admin Role!" });
        return;
    } catch (err) {
        resp.status(500).send({ message: err });
        console.log(err);
        return;
    }
};

isModerator = async (req, resp, next) => {
    try {
        const user = await User.findById(req.userId).exec();

        const roles = await Role.find({
            _id: { $in: user.roles },
        });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }
        }

        resp.status(403).send({ message: "Require Moderator Role!" });
        return;
    } catch (err) {
        resp.status(500).send({ message: err });
        console.log(err);
        return;
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};

module.exports = authJwt;
