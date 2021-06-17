const user = require('../models/user');
const crypto = require('crypto');
const bcrypt = require ('bcrypt');
const saltRounds = 10;


resetPassword = async (req, res) => {
    const {token, NewPassword, NewConfimP} = req.body;
    let hashPassword = await bcrypt.hash(NewPassword, saltRounds);
     user.getUser('GetUserByToken',token)
    .then((response) => {
        if(response){
            if(NewPassword !== NewConfimP){
                res.send({reset: false, error: 'Passwords does not match !'})
            }
            else
            {
                user.ResetPassword(hashPassword, token);
                const vfToken = crypto.randomBytes(64).toString('hex');
                user.UpdatvfToken(response.email, vfToken);
                res.send({reset: true});
            }
        }
        else
            res.send({reset: false, error: 'Token may be expired, please retry.'});
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = resetPassword;