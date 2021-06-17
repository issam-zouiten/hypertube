const user = require('../models/user');
const sendmail = require('./sendmail');
sendResetEmail = async (req, res) => {
    const {email} = req.body;
     user.getUser('GetUserByEmail', email)
    .then((response) => {
        if(response){
            // console.log("okkk");
            sendmail.sendResetEmail(email, response.vfToken);
            res.send({sent: true, error: null});
        }
        else
            res.send({sent: false, error: 'Email not found'});
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = sendResetEmail;