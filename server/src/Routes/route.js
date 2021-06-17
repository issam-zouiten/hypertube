const express = require("express");
const router = express.Router();

const logout = require('../controllers/logout');
const editProfile = require ('../controllers/editProfile');
const getMovies = require('../controllers/Library/getMovies');
const getMovieData = require('../controllers/Library/getMovieData');
const getSimilarMovies = require('../controllers/Library/getSimilarMovies')
const updateSeen = require('../controllers/Library/updateSeen')
const getSeenMovies = require('../controllers/Library/getSeenMovies')
const getComments = require('../controllers/Library/getComments');
const addComment = require('../controllers/Library/addComment');
const streaming = require('../controllers/Library/streaming');
const checkToken = require('../controllers/checkToken');
router.get('/streaming/:hash',streaming);

router.use(async function (req,res,next) {
    const token = req.headers.authorization;
    // console.log('ok')
    if(token !== 'undefined')
    {
        const isValid = await checkToken(token);
        if(isValid)
            next();
        else
            console.log('Token is invalid'); 
    }else
        console.log('token is undefined')
    
})


router.post('/logout', logout);
router.post('/editProfile', editProfile);
router.post('/getMovies', getMovies);
router.post('/getMovieData',getMovieData);
router.post('/getSimilarMovies',getSimilarMovies);
router.post('/updateSeen',updateSeen)
router.post('/getSeenMovies',getSeenMovies)
router.post('/getComments', getComments);
router.post('/addComment', addComment);




module.exports = router;