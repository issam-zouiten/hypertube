const uti = require('../util/lib');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendmail = require('./sendmail');
const saltRounds = 10;

editProfile = async (req, res) => {
    const info = req.body;
    let verif= false;
    let result = {
        valid: false,
    };
    let CheckUsername = await  user.getUser('CheckEditUsername', [info.username, info.id]);
    let CheckEmail = await  user.getUser('CheckEditEmail', [info.email, info.id]);

    if(CheckUsername)
        result.errUsername = 'Username already exists';
    if(CheckEmail)
        result.errEmail = 'Email already exists';
    const passwordnew = info.hasOwnProperty('password'); const confnewPassword = info.hasOwnProperty('confirmPassword');
    if( passwordnew || confnewPassword)
    {
        if((passwordnew && confnewPassword) && uti.isPassword(info.password, info.confirmPassword))
        {
            let hashPassword = await bcrypt.hash(info.password, saltRounds);
            user.update('UpdatePassword', [hashPassword, info.id]);
            verif = true;
        }
        else
        {
            result.password = 'Password error';
            verif = false;
        }
    }

    if(uti.isLastname(info.lastname) && uti.isFirstname(info.firstname) && uti.isUsername(info.username) && uti.isEmail(info.email) && !CheckUsername && !CheckEmail )
    {    

        const check = await user.getUser('GetUserById',info.id);
        if(check && info.email !== check.email)
        {
            user.notverfid(check.email);
            const vfToken = crypto.randomBytes(64).toString('hex');
            user.UpdatvfToken(check.email, vfToken);
            sendmail.sendEmail(info.email, vfToken);
            result.verif = false;
        }
        user.update('UpdateProfile',[info.firstname, info.lastname, info.username, info.email, info.langue, info.id]);
        const userUpdate = await user.getUser('GetUserById',info.id);
        if(userUpdate){
            delete userUpdate.vfToken;
            delete userUpdate.password;
        }
        result.valid = true;
        res.send({result, userUpdate});
    }
    else{
        
        result.valid = false;
        let err = [];
        for(let key in result){
            if(key !== 'valid')
                err.push(result[key]);
        }
        res.send({result, err});
    }
};

module.exports = editProfile;