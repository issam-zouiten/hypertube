const isEmpty = require('../empty/isEmpty')



const isProfileComplete = user => (
    (!isEmpty(user)
        && !isEmpty(user.username)
        && !isEmpty(user.firstname)
        && !isEmpty(user.lastname)
        && !isEmpty(user.email)
        && !isEmpty(user.age)
        && !isEmpty(user.birthday)
        && !isEmpty(user.gender)
        && !isEmpty(user.biography)
        && !isEmpty(user.latitude)
        && !isEmpty(user.longitude)
        && !isEmpty(user.interests)
        && !isEmpty(user.profilePic)
        && (user.isAccountverif === 1 || user.isAccountverif === true))
)

module.exports = isProfileComplete
