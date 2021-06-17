
const isEmpty = require("./func/isEmpty")
const isDigit = require("./func/isDigit")
const isLowercase = require("./func/isLowercase")
const isUppercase = require("./func/isUppercase")
const isSpecial = require("./func/isSpecial")
const isAlpha = require("./func/isAlpha")
const isAlphaNumeric = require("./func/isAlphaNumeric")
const isNumeric = require("./func/isNumeric")
const isFloat = require("./func/isFloat")

const isUsername = require("./useruti/isUsername")
const isEmail = require("./useruti/isEmail")
const isFirstname = require("./useruti/isFirstname")
const isLastname = require("./useruti/isLastname")
const isPassword = require("./useruti/isPassword")

module.exports = {
    isEmpty, isDigit, isLowercase, isUppercase, isSpecial,
    isAlpha, isAlphaNumeric, isNumeric, isFloat, isUsername,
    isEmail, isFirstname, isLastname, isPassword
};