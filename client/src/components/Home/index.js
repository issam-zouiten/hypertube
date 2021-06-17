import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Navbar from "../../containers/Navbar";
import "./home.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  upBtn: {
    zIndex: 99,
    position: "fixed",
    bottom: "7%",
    right: "1%",
  },
  rating: {
    maxWidth: 400,
  },
  block: {
    display: "block",
  },
  none: {
    display: "none",
  },
  loading: {
    position: "fixed",
    top: "10%",
    width: "100%",
    height: "30%",
  },
}));

export default function Home(props) {
  const {
    movies,
    handleMovie,
  } = props;
  const classes = useStyles();
  console.log(movies);

  const handleNotFound = (e) =>{
    e.target.src = 'https://images-na.ssl-images-amazon.com/images/I/41bLP6NzvKL.jpg';
  }

  return (
    <>
      {movies.status !== "loading" && (
        <>
          <Grid container justify="center" className="moviesContainer">
            <Fab
              className={classes.upBtn}
              color="secondary"
              size="medium"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
            {movies.movies &&
              movies.movies.length > 0 &&
              movies.movies.map((element, index) => (
                <React.Fragment key={index}>
                  {(element.large_cover_image ) ||  (element.poster_big) && (
                      <Card className="card">
                        <div className="container">
                          <img
                            className="media"
                            onError={handleNotFound}
                            src={element.large_cover_image || element.poster_big}
                            alt={element.title}
                            />
                          <Grid
                            container
                            className="overlay"
                            alignItems="center"
                            onClick={(e) => handleMovie(element)}
                            >
                            <Grid item xs={12} className="text">
                            <h1>
                                {element.title.replace(/ *\([^)]*\) */g, "")} <br/> ({element.year})
                              </h1>
                            </Grid>
                            <Grid item xs={12} style={{ height: "25%" }}></Grid>
                            <Grid
                              item
                              container
                              xs={12}
                              component="legend"
                              style={{ color: "white", padding: "10px" }}
                              direction="row"
                              alignItems="center"
                            >
                              <StarIcon
                                style={{ fill: "yellow", marginRight: 3 }}
                              />
                              {(element.rating.percentage &&
                                (
                                  (element.rating.percentage * 10) /
                                  100
                                ).toFixed(1)) ||
                                (element.rating &&
                                  (element.rating * 1).toFixed(1))}
                            </Grid>
                          </Grid>
                        </div>
                      </Card>
                    )}
                </React.Fragment>
              ))}
            {!movies.movies && movies.movies.length === 0 && (
              <p className="noMovies">No movies found</p>
            )}
          </Grid>
        </>
      )}
      {movies.status === "loading" && (
        <Grid className={classes.loading} container justify="center">
          <CircularProgress color ="secondary"/>
        </Grid>
      )}
    </>
  );
}
