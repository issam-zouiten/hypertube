const user = require('../models/user');
const crypto = require('crypto');

confirmToken = async (req, res) => {

    const token = req.body.token;
    user.getUser('GetUserByToken', token)
        .then((response) => {
            if (response) {
                const vfToken = crypto.randomBytes(64).toString('hex');
                user.UpdatvfToken(response.email, vfToken);
                user.verif(response.email);
                res.send('success');
            }
            else
                res.send('error');
        }).catch((error) => {
            console.log(error);
        });
};

module.exports = confirmToken;