const passport = require("passport");
const passportSetup = require("./src/Config/passport-setup");
const app = require('./src/app');


const server = app.listen(3001, () => {
    console.log("running on port 3001");
});