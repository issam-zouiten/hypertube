const unirest = require("unirest");
// const yifysubtitles = require('yifysubtitles');
// const yifysubtitles = require("@amilajack/yifysubtitles");
// const yifysub = require("yifysub");
// var YFsubs = require("yify-subs");
// const ytssubs = require('ytssubs')
// const yifysubtitles2GS = require('yifysubtitles-to-gs');
const OS = require("opensubtitles-api");
var srt2vtt = require("srt-to-vtt");
var fs = require("fs");
let cloudscraper = require("cloudscraper");
const path = require('path')
const axios = require('axios')
const http = require("http");

// const { opensubtitles_config } = require("./opensub");
// const mkdirp = require('mkdirp');
// const srt2vtt = require('srt-to-vtt');
// const download = require('download');



getMovieDataById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      let imdb = null;
      var req = unirest(
        "GET",
        `https://api.themoviedb.org/3/movie/${id}?api_key=0f87bface5c69fcf394fc387f33049fa&language=en-US`
      );
      req.end(function (result) {
        if (result.error) console.log("timeout in server themoviedb");
        if (result.body.imdb_id) imdb = result.body.imdb_id;
        resolve(imdb);
      });
    } catch (error) {
      console.log("getMovieData timeout");
      return null;
    }
  });
};
// getMovieStream = (imdb) => {
//   return new Promise((resolve, reject) => {
//     try {
//       var unirest = require("unirest");

//       var req  = unirest("GET", `https://movies-sources.p.rapidapi.com/api/${imdb}`);

//       req.headers({
//         "x-rapidapi-key": "6a4fa63f81msh5cbb2be402fc96bp1eaeb7jsnada33f27f798",
//         "x-rapidapi-host": "movies-sources.p.rapidapi.com",
//         "useQueryString": true
//       });
      
      
//       req.end(function (res) {
//         if (res.error) throw new Error(res.error);
      
//         resolve(res.body);
//       });
//     } catch (error) {
//       console.log("getMovieData timeout");
//       return null;
//     }
//   });
// };
getSubtitles = (imdb) => {
  return new Promise((resolve, reject) => {
    try {
      const OpenSubtitles = new OS("UserAgent");
      OpenSubtitles.api.LogIn("othyothy", "12345Othy", "en", "UserAgent")
        .then((res) => {
          if (res) {
            if (res.status === "200 OK") {
              if (`./subtitles/${imdb}en.vtt`)
                OpenSubtitles.search({ imdbid: imdb }).then((subtitles) => {
                  fs.exists(`./subtitles/${imdb}en.vtt`, function (ex) {
                    if (ex)
                      resolve(subtitles)
                    else {
                      if (subtitles.en.utf8) {
                        http.get(subtitles.en.utf8, (res) => {
                          const path = `./subtitles/${imdb}en.srt`;
                          const filePath = fs.createWriteStream(path);
                          res.pipe(filePath);
                          filePath.on("finish", () => {
                            filePath.close();
                            fs.createReadStream(filePath.path).pipe(srt2vtt())
                              .pipe(fs.createWriteStream(`./subtitles/${imdb}en.vtt`));
                            fs.exists(path, function (ex) {
                              if (ex) {
                                fs.unlinkSync(path);
                              }
                            });
                          });
                        });
                      }
                      if (subtitles.ar) {
                        http.get(subtitles.ar.utf8, (res) => {
                          const path = `./subtitles/${imdb}ar.srt`;
                          const filePath = fs.createWriteStream(path);
                          res.pipe(filePath);
                          filePath.on("finish", () => {
                            filePath.close();
                            fs.createReadStream(filePath.path).pipe(srt2vtt())
                              .pipe(fs.createWriteStream(`./subtitles/${imdb}ar.vtt`));
                            fs.exists(path, function (ex) {
                              if (ex) {
                                fs.unlinkSync(path);
                              }
                            });
                          });
                        });
                      }
                      if (subtitles.fr) {
                        http.get(subtitles.fr.utf8, (res) => {
                          const path = `./subtitles/${imdb}fr.srt`;
                          const filePath = fs.createWriteStream(path);
                          res.pipe(filePath);
                          filePath.on("finish", () => {
                            filePath.close();
                            fs.createReadStream(filePath.path).pipe(srt2vtt())
                              .pipe(fs.createWriteStream(`./subtitles/${imdb}fr.vtt`).on("finish", () => {
                                fs.exists(`./subtitles/${imdb}fr.vtt`,
                                  function (ex) {
                                    if (ex)
                                      resolve(subtitles)
                                  });
                              }));
                            fs.exists(path, function (ex) {
                              if (ex)
                                fs.unlinkSync(path);
                            });
                          });
                        });
                      }
                    }
                  });
                });
            }
          }
        });
    } catch (error) {
      console.log("getMovieData timeout");
      return null;
    }
  });
};


getMovieData = async (req, res) => {
  const data = req.body;
  const info = {
    torrents: "",
    trailer: "",
  };
  let imdb = data.code;
  //   let imgs = null;

  if (data.type === "id") {
    let temp = await getMovieDataById(data.code);
    if (temp !== null) imdb = temp;
  }
  let result1 = await cloudscraper.get(
    `https://tv-v2.api-fetch.sh/movie/${imdb}`
  );

  if (result1) {
    let x = JSON.parse(result1);
    info.torrents = x.torrents;
    info.trailer = x.trailer;
    // console.log(x);
  }
  // let mov = getMovieStream(imdb);
  // console.log(mov);
  let subtitles = await getSubtitles(imdb)
  var subt = Object.keys(subtitles);
  for (var i = 0; i < subt.length; i++) {
    // console.log(subtitles[subt[i]].langcode, 'ouiii')
    if (subtitles[subt[i]].langcode === "en") {
      const t = fs.readFileSync('./subtitles/' + imdb + 'en.vtt', 'utf8')
      let buff = new Buffer.from(t);
      let base64data = buff.toString('base64');
      subtitles[subt[i]].fileName = base64data
      // console.log(subtitles[subt[i]], "nnnnnnnnnn");
    }
    else if (subtitles[subt[i]].langcode === "fr") {
      const t = fs.readFileSync('./subtitles/' + imdb + 'fr.vtt', 'utf8')
      let buff = new Buffer.from(t);
      let base64data = buff.toString('base64');
      subtitles[subt[i]].fileName = base64data
      // console.log(subtitles[subt[i]], "nnnnnnnnnn");
    }
    else if (subtitles[subt[i]].langcode === "ar") {
      const t = fs.readFileSync('./subtitles/' + imdb + 'ar.vtt', 'utf8')
      let buff = new Buffer.from(t);
      let base64data = buff.toString('base64');
      subtitles[subt[i]].fileName = base64data
      // console.log(subtitles[subt[i]], "nnnnnnnnnn");
    }
    else {
      delete subtitles[subt[i]];
    }
  }
  var unirest = require("unirest");
  var req = unirest("GET", "https://movies-tvshows-data-imdb.p.rapidapi.com/");

  req.query({
    type: "get-movie-details",
    imdb: imdb,
  });

  req.headers({
    "x-rapidapi-key": "6a4fa63f81msh5cbb2be402fc96bp1eaeb7jsnada33f27f798",
    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
    useQueryString: true,
  });

  var req1 = unirest("GET", "https://movies-tvshows-data-imdb.p.rapidapi.com/");

  req1.query({
    "type": "get-movies-images-by-imdb",
    "imdb": imdb
  });

  req1.headers({
    "x-rapidapi-key": "6a4fa63f81msh5cbb2be402fc96bp1eaeb7jsnada33f27f798",
    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
    "useQueryString": true
  });

  req.end(function (response) {
    let Data = response.body;
    if (Data) {
      Data.torrents = info.torrents.en;
      Data.trailer = info.trailer;
      Data.subtitles = subtitles;
      req1.end(function (response1) {
        Data.imgs = response1.body;
        res.send({ isData: true, data: Data });
      });
    } else {
      res.send({ isData: false, data: null });
    }
  });

};
module.exports = getMovieData;
