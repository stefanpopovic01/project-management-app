require('dotenv').config();
const mongoose = require("mongoose");

const { Limiter } = require("./middleware/rateLimiter");

const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const app = express()

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
app.use(helmet());
app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(hpp());

app.get("/", (req, res) => {
    res.send("Home")
})

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/notification", notificationRouter);

app.use((err, req, res, next) => {
    console.error(`[Error] ${err.name}: ${err.message}`);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            status: "error",
            error: err.message 
        });
    }
    
    res.status(500).json({ 
        status: "error",
        error: "Something went wrong on our end. Please try again later." 
    });
});

app.listen(3001);

