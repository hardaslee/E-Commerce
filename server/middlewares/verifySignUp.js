const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, resp, next) => {
    console.log("Request body:", req.body);
    // check username
    try {
        // Check username
        const userByUsername = await User.findOne({
            username: req.body.username,
        }).exec();
        if (userByUsername) {
            resp.status(400).send({
                message: "Failed! Username is already in use!",
            });
            return;
        }

        // Check email
        const userByEmail = await User.findOne({
            email: req.body.email,
        }).exec();
        if (userByEmail) {
            resp.status(400).send({
                message: "Failed! Email is already in use!",
            });
            return;
        }

        next();
    } catch (err) {
        resp.status(500).send({
            message: err.message || "Some error occurred.",
        });
    }
};

checkRolesExisted = (req, resp, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                resp.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`,
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};

module.exports = verifySignUp;
