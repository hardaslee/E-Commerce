const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SunglassesSchema = new Schema(
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

const Sunglasses = mongoose.model("Sunglasses", SunglassesSchema);

module.exports = Sunglasses;
