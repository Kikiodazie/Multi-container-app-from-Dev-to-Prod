const express = require("express");
const { default: mongoose } = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express()

const mongoDBURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/test?authSource=admin`;

mongoose
.connect(mongoDBURL)
.then(() => console.log("Successfully connected to DB"))
.catch((e) => console.log(e))

app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!!</h2>");
} )


app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`lisening on port ${port}`))