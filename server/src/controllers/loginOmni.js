const bcrypt = require('bcrypt');
const user = require('../models/user');
var jwt = require('jsonwebtoken');
LoginOmni = async (req, res) => {

    let token = req.body.data;

    let us = await jwt.verify(token, 'SecretKey');
    const dataUser = await user.getUser('GetUserById', us['id']);

    if (dataUser) {

        delete dataUser.vfToken;
        delete dataUser.password;
        res.send({ isValid: true, user: dataUser });
    }
    else
        res.send({ isValid: false, errorField: 'Something went wrong' });
}

module.exports = LoginOmni;