// require('dotenv').config();
// const mongoose = require("mongoose");
// const cors = require("cors");

const express = require("express");

const app = express()

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("Povezan sa bazom."))
// .catch(() => console.log("Nije povezan sa bazom."));

app.use(express.json());
// app.use(cors('*'));

app.get("/", (req, res) => {
    res.send("Pocenta stranica.")
})

app.listen(3001);