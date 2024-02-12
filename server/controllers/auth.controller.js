const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, resp) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    try {
        const savedUser = user;

        if (req.body.roles) {
            const roles = await Role.find({ name: { $in: req.body.roles } });
            savedUser.roles = roles.map((role) => role._id);
        } else {
            const defaultRole = await Role.findOne({ name: "user" });
            savedUser.roles = [defaultRole._id];
        }

        await savedUser.save();
        resp.send({ message: "User was registered successfully!" });
    } catch (err) {
        resp.status(500).send({
            message: err.message || "Some error occurred during registration.",
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        })
            .populate("roles", "-__v")
            .exec();

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        const token = await jwt.sign({ id: user.id }, config.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (err) {
        res.status(500).send({ message: err });
        // console.log(err);
    }
};

exports.delete = async (req, res) => {
    User.findOneAndDelete({
        username: req.body.username,
    })
        .then((user) => {
            console.log(req.body.username);
            console.log(user);
            if (!user) {
                return res.status(404).send({
                    message: "User not found ",
                });
            }
            res.send({ message: "User deleted successfully!" });
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete user ",
            });
        });
};
