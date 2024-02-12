const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WatchesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Watches = mongoose.model("Watches", WatchesSchema);

module.exports = Watches;
