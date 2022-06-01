const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express()


mongoose.connect("mongodb://divine:test@mongoDB/?authSource=admin")
.then(() => console.log("Successfully connected to DB"))
.catch((e) => console.log(e))

app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!!</h2>");
} )
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`lisening on port ${port}`))