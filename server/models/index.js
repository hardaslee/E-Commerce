const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.hats = require("./hats");
db.sunglasses = require("./sunglasses");
db.watches = require("./watches");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
