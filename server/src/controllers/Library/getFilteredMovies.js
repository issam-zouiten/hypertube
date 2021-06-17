const cloudscraper = require('cloudscraper');
const getFilteredMovies = (filter) => {
    return new Promise((resolve, reject) => {
        console.log("dkhqlllllllllll")
        const obj = {
            category: filter.category === null  ? '' : filter.category,
            sortBy: filter.sortBy === null ? 'seeds' : filter.sortBy,
            orderPopCorn: filter.sortBy === null ? '1' : '-1',
            orderYts: filter.sortBy === null ? 'desc' : 'asc',
        }
        // console.log(obj.sortBy, 'category==============')
        // console.log(filter.page)
        cloudscraper.get(`http://api.pctapi.com/list?sort=${obj.sortBy}&short=1&cb=&quality=720p,1080p,3d&page=${filter.page}&genre=${obj.category}&order_by=${obj.orderYts}`)
        .then(resp => {
            let result1 = JSON.parse(resp);
            if(result1.MovieList.length > 0 )
            {
                resolve(result1.MovieList);
            }
            else
            {
                obj = {
                    sortBy: filter.sortBy === null ? 'title' : (filter.sortBy === 'dateadded' ? 'last_added' : filter.sortBy),
                }
                cloudscraper.get(`https://yts.megaproxy.info/api/v2/list_movies.json?limit=50&page=${filter.page}?genre=${obj.category}&sort_by=${obj.sortBy}&order=${obj.orderPopCorn}`)
                .then(resp => {
                    let result2 = JSON.parse(resp);
                    if(result2.status === 'ok' && result2.data.movies.length > 0)
                    {

                        resolve(result2.data.movies);
                    }
                })
                .catch(err => {});
            }
        })
        .catch(err => {})
    })
}
module.exports = getFilteredMovies;