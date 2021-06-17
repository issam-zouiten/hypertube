const isEmpty = require('../func/isEmpty')
const isDigit = require('../func/isDigit')
const isSpecial = require('../func/isSpecial')
const isLowercase = require('../func/isLowercase')
const isUppercase = require('../func/isUppercase')

const isPassword = (password, cpassword) => {
    if (isEmpty(password)) return false
    if (password.length < 8 && password.length > 30) return false
    if (!(isDigit(password) && isSpecial(password) && isLowercase(password) && isUppercase(password))) return false
    if (!isEmpty(cpassword) && cpassword !== password) return false
    return true
}

module.exports = isPassword;