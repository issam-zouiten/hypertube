const multer = require('multer')
const express = require('express');
var Jimp = require('jimp');
const app = express()
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const uti = require('../util/lib');
const user = require('../models/user');
const sendmail = require('./sendmail');
const saltRounds = 10;

const checkFileType = (file, cb) => {
    if ((file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) cb(null, true)
    else cb(null, false)
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './pics')
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname)
    },
  })
  const upload = multer({
    storage,
    onError: function (err, next) {
      console.log('error');
  
    },
  
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });
  

app.post('/register', upload.single('files'), async (req, res) => {
    file = req.file;
    try {
      if (tools.isEmpty(file)) {
        console.log('No file uploaded')
        return res.send('No file uploaded');
      }
  
      if (file.size === 0) {
        return res.send('is not a file');
      }
    }
    catch{
      console.log('Invalid input')
    }

    const { firstname, lastname, username, email, password, confirmPassword } = req.body;
    let GetUserByUsername = await user.getUser('GetUserByUsername', username);
    let GetUserByEmail = await user.getUser('GetUserByEmail', email);
    let data = {
        isValid: true,
        errUsername: null,
        errEmail: null,
    };
    if (GetUserByEmail) {
        data.errEmail = 'Email already exists';
    }
    if (GetUserByUsername) {
        data.errUsername = 'Username already exists';
    }
    if (!uti.isFirstname(firstname) || !uti.isLastname(lastname) || !uti.isUsername(username) || !uti.isEmail(email) || GetUserByEmail || GetUserByUsername || !uti.isPassword(password, confirmPassword)) {
        data.isValid = false;
    }
    else {
        try {
            const isImage = await Jimp.read('./pics/' + file.filename);
            let hashPassword = await bcrypt.hash(password, saltRounds);
            const vfToken = crypto.randomBytes(64).toString('hex');
            user.Register(firstname, lastname, username, email, hashPassword);
            user.UpdatvfToken(email, vfToken);
            sendmail.sendEmail(email, vfToken);
        }
        catch (e) {
            data.errPicture = 'picture is not valid'
            data.isValid = false;
        }
    }
    res.send(data);
});
module.exports = app;