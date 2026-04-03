require('dotenv').config();
const mongoose = require("mongoose");

const express = require("express");
const app = express()

const userRouter = require("./routes/user");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Povezan sa bazom."))
.catch(() => console.log("Nije povezan sa bazom."));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pocenta stranica.")
})

app.use("/user", userRouter);


app.listen(3001);

