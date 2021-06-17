const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const cors = require("cors");
const OffSession = require('./routes/OffSession');
const authRoutes = require('./routes/auth-routes');
const rout = require('./routes/route');
const register = require('./controllers/register')
const upload = require('./controllers/uploadFile')


const app = express();
app.use("/subtitles", express.static("./subtitles"));
app.use(express.static('pics'));
//database connection
const con = require('./Config/db_conn');

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    }))

//routes

app.use(OffSession);
app.use(register)
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(upload)
app.use(rout);

//error
app.use((req, res, next) => {
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';
    res.status(status).send({
        error
    })
})

module.exports = app;