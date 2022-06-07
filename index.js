const express = require("express");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT, 
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require("./config/config");

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
}
);


const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express()

const mongoDBURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/test?authSource=admin`;

mongoose
.connect(mongoDBURL)
.then(() => console.log("Successfully connected to DB"))
.catch((e) => console.log(e))

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: false,
        maxAge: 30000,
    }
}));

app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!!</h2>");
} )


app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`lisening on port ${port}`))