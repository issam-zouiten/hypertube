const cloudscraper = require('cloudscraper');

const getMoviesByName = (filter) => {
    return new Promise((resolve, reject) => (
        cloudscraper.get(`http://api.pctapi.com/list?sort=title&order_by=desc&short=1&cb=&quality=720p,1080p,3d&page=${filter.page}&keywords=${filter.title}`)
        .then(resp => {
            let result1 = JSON.parse(resp);
            console.log(result1.MovieList)
            if(result1.MovieList.length > 0 && result1.MovieList[0].title){
                resolve(result1.MovieList);
            }
            else
            {
                cloudscraper.get(`https://yts.megaproxy.info/api/v2/list_movies.json?limit=50&sort_by=title&query_term=${filter.title}&page=${filter.page}`)
                .then(resp => {
                    let result2 = JSON.parse(resp);
                    if(result2.status === 'ok' && result2.data.movie_count > 0)
                    {
                        if(result2.data.movies.length > 0)
                            resolve(result2.data.movies);
                        else
                            resolve([]);
                    }
                    else
                    {
                        resolve([]);
                    }
                })
                .catch(err => {});
            }
        })
        .catch(err => {})
    ))
}

module.exports = getMoviesByName;