const isEmpty = require('../func/isEmpty')
const isAlphaNumeric = require('../func/isAlphaNumeric')

const isUsername = (username) => {
    if (isEmpty(username)) return false
    if (username.length < 2 || username.length > 20) return false
    if (isAlphaNumeric(username)) return false
    return true
}

module.exports = isUsername