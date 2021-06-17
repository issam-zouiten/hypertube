const isSort = (sort) => {
    if(sort !== null && sort !== 'year' && sort !== 'seeds' && sort !== 'dateadded' && sort !== 'title')
        return false
    return true
}

module.exports = isSort;