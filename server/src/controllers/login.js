const bcrypt = require("bcrypt");
const user = require('../models/user');

Login = async (req, res) => {
    
    const { username, password } = req.body;
    let dataUser = await user.getUser('GetUserByUsername', username);
    console.log(dataUser,'okiiidatatttttttt')
    if (dataUser) {
        bcrypt.compare(password, dataUser.password)
            .then((response) => {
                if (response) {
                    if (dataUser.verif === 1) {
                        delete dataUser.vfToken;
                        delete dataUser.password;
                        res.send({ isValid: true, user: dataUser });
                    }
                    else
                        res.send({ isValid: false, errorField: 'Please confirm your e-mail' });
                }
                else {
                    res.send({ isValid: false, errorField: 'Wrong Password' });

                }
            })
            .catch(err => console.log(err))
    }
    else
        res.send({ isValid: false, errorField: "User Does not Exist" });

}

module.exports = Login;
