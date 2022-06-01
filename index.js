const express = require("express");
const { default: mongoose } = require("mongoose");
const { MONG0_USER, MONG0_PASSWORD, MONG0_IP, MONG0_PORT } = require("./config/config");

const app = express()


mongoose
.connect(`mongodb://${MONGO_USER}:${MONG0_PASSWORD}@${MONG0_IP}:${MONG0_PORT}/?authSource=admin`)
.then(() => console.log("Successfully connected to DB"))
.catch((e) => console.log(e))

app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!!</h2>");
} )
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`lisening on port ${port}`))