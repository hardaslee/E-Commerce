const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/user");
const itemData = require('./data.js'); 
const path = require('path');

var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/hats', (req, res) => {
    res.json(itemData.hats);
});

app.get('/api/watches', (req, res) => {
    res.json(itemData.watches);
});

app.get('/api/sunglasses', (req, res) => {
    res.json(itemData.sunglasses);
});


const db = require("./models");
const Role = db.role;
const Hats = db.hats;
const Sunglasses = db.sunglasses;
const Watches = db.watches;

const uri =
    "mongodb+srv://irahudgin:pTKHaLOaSfzGnHG1@cluster0.ttxkt7z.mongodb.net/EELuxDB?retryWrites=true&w=majority";
mongoose
    .connect(uri)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

db.mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

console.log("App listen at port 5000");

app.get("/", (req, resp) => {
    resp.send("App is Working");
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

async function initial() {
    let count = await Role.estimatedDocumentCount();
    let count2 = await Hats.estimatedDocumentCount();
    let count3 = await Sunglasses.estimatedDocumentCount();
    let count4 = await Watches.estimatedDocumentCount();
    console.log("hats = " + count2);
    console.log("sunglasses = " + count3);
    console.log("watches = " + count4);

    if (count === 0) {
        new Role({
            name: "user",
        })
            .save()
            .then((result) => {
                console.log(result);
            });

        new Role({
            name: "moderator",
        })
            .save()
            .then((result) => {
                console.log(result);
            });

        new Role({
            name: "admin",
        })
            .save()
            .then((result) => {
                console.log(result);
            });
    }

    if (count2 === 0) {
        const hats = itemData.hats;

        hats.forEach((item) => {
            new Hats({
                name: item.name,
                description: item.description,
                price: item.price,
                imageUrl: item.imageUrl,
            })
                .save()
                .then((result) => {
                    console.log(result);
                });
        });
    }

    if (count3 === 0) {
        const sunglasses = itemData.sunglasses;

        sunglasses.forEach((item) => {
            new Sunglasses({
                name: item.name,
                description: item.description,
                price: item.price,
                imageUrl: item.imageUrl,
            })
                .save()
                .then((result) => {
                    console.log(result);
                });
        });
    }

    if (count4 === 0) {
        const watches = itemData.watches;

        watches.forEach((item) => {
            new Watches({
                name: item.name,
                description: item.description,
                price: item.price,
                imageUrl: item.imageUrl,
            })
                .save()
                .then((result) => {
                    console.log(result);
                });
        });
    }
}

app.get("/users", async (req, resp) => {
    const user = new User({
        email: "ex22@gmail.com",
        password: "1234",
    });
    // user.save().then((result) => {
    //     resp.send(result);
    // });
    User.findById("65a184ea8a7cde6e5ba0a6c5")
        .then((result) => {
            resp.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.listen(5000);
