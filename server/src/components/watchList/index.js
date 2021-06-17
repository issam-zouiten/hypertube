import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../image/logo.png";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    top: "50%",
  },
}));

export default function Home(props) {
  const { movies, handleMovie, handleLogout } = props;
  const classes = useStyles();
  return (
    <>
        <Grid container item xs={12}>
          <Grid container item xs={12}>
            <Grid item xs={11}>
              <Link to="/Home" style={{ textDecoration: "none" }}>
                <img src={Logo}  className="movieLogo" />
              </Link>
            </Grid>
            <Grid item xs={1}>
              <ExitToAppIcon className="movieLogout" onClick={handleLogout} />
            </Grid>
          </Grid>
          <Grid container justify="center">
            {console.log(movies)}
            {movies &&
              movies !== "loading" &&
              movies.length > 0 &&
              movies.map((element, index) => (
                <React.Fragment key={index}>
                  <Card className="card">
                    <div className="container">
                      <img
                        className="media"
                        src={element.poster}
                        alt={element.title}
                      />
                      <button onClick={(e) => handleMovie(element)}>
                        <div className="overlay">
                          <div className="text">
                            <h1>{element.title + ` (${element.year})`}</h1>
                            <Typography component="legend">
                              <StarIcon style={{ fill: "yellow" }} />(
                              {element.rating})
                            </Typography>
                          </div>
                        </div>
                      </button>
                    </div>
                  </Card>
                </React.Fragment>
              ))}
            {movies && movies !== "loading" && movies.length === 0 && (
              <p className="noMovies">No movies found</p>
            )}
          </Grid>
        </Grid>
    </>
  );
}
