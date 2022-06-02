const express = require("express");
const { default: mongoose } = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const app = express()

const mongoDBURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/test?authSource=admin`;

mongoose
.connect(mongoDBURL)
.then(() => console.log("Successfully connected to DB"))
.catch((e) => console.log(e))

app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!!</h2>");
} )
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`lisening on port ${port}`))