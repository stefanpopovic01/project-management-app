require('dotenv').config();
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const app = express()

const { Limiter } = require("./middleware/rateLimiter");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");
const taskRouter = require("./routes/task");
const notificationRouter = require("./routes/notification");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Povezan sa bazom."))
.catch(() => console.log("Nije povezan sa bazom."));

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200 
};

app.use(express.json());
app.use(Limiter);
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Pocenta stranica.")
})

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/notification", notificationRouter);


app.listen(3001);

