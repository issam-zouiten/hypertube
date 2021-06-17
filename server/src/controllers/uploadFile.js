const multer = require('multer')
const express = require('express');
const tools = require('../util/lib');
const user = require('../models/user')
var Jimp = require('jimp');
const app = express()
const checkFileType = (file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true)
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

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

app.post('/upload', upload.single('files'), async (req, res) => {
  user_id = req.body.user_id;
  file = req.file;

  if (tools.isEmpty(file)) {
    console.log('No file uploaded')
    return res.send({isValid : false ,error : 'No file uploaded'});
  }
  if (file.size === 0) {
    return res.send({isValid : false ,error : 'is not file'});
  }

  try {
    await Jimp.read('./pics/' + file.filename);
    try {
       await user.update("UpdateImage",[file.filename,user_id])
       res.send({isValid : true,data : file.filename})
    } catch (error) {
        console.log('error')
    }
    
 } catch (error) {
   res.send({isValid : false ,error : 'Invalid images'})
 }


});
module.exports = app;
