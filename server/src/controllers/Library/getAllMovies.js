const cloudscraper = require('cloudscraper');
const getAllMovies = (filter) => {
    return new Promise((resolve, reject) => (
        cloudscraper.get(`http://api.pctapi.com/list?limit=2&sort=seeds&short=1&cb=&quality=720p,1080p,3d&page=${filter.page}`)
        .then(resp => {
            // console.log("enter")
            let result1 = JSON.parse(resp);
            // console.log(result1.MovieList.sort())
            if(result1.MovieList.length > 0)
            {
                result1.MovieList.sort((a, b) => {return b.rating.percentage - a.rating.percentage})
                resolve(result1.MovieList);
            }
            else
            {
                console.log("here")
                cloudscraper.get(`https://yts.megaproxy.info/api/v2/list_movies.json?limit=50&sort_by=download_count&order_by=desc&page=${filter.page}`)
                .then(resp => {
                    let result2 = JSON.parse(resp);
                    if(result2.status === 'ok' && result2.data.movies.length > 0)
                    {
                        result2.data.movies.sort((a, b) => {return b.rating - a.rating})
                        resolve(result2.data.movies);
                    }
                    else
                        resolve([]);
                })
                .catch(err => {});
            }
        })
        .catch(err => {console.log("error")})
    ))
}
module.exports = getAllMovies;