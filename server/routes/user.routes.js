const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
const db = require("../models");

const Hats = db.hats;
const Sunglasses = db.sunglasses;
const Watches = db.watches;

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", userController.allAccess);

    app.get("/api/items/hats", async (req, res) => {
        try {
            const hats = await Hats.find({});
            res.status(200).json(hats);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

    app.get("/api/items/sunglasses", async (req, res) => {
        try {
            const sunglasses = await Sunglasses.find({});
            res.status(200).json(sunglasses);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

    app.get("/api/items/watches", async (req, res) => {
        try {
            const watches = await Watches.find({});
            res.status(200).json(watches);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
};
