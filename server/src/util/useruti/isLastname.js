const isEmpty = require('../func/isEmpty')
const isAlpha = require('../func/isAlpha')

const isLastname = (lastname) => {
    if (isEmpty(lastname)) return false
    if (lastname.length > 20) return false
    if (!isAlpha(lastname)) return false
    return true
}

module.exports = isLastname