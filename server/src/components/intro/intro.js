import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import "./intro.css";

export default function intro() {
  return (
    <>
      <Grid container className="introContainer">
        <Grid container item xs={12}>
          <Grid item lg={2} xs={11}>
            <h1 className="logo">Hypertube</h1>
          </Grid>
          <Grid item lg={9} xs={1}></Grid>
          <Grid item lg={1}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                className="introBtn"
                variant="contained"
              >
                Signin
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="column">
          <Grid item lg={4} className="descriptionContainer">
            <h1>
              Watch TV Shows Online, Watch Movies Online. Unlimited movies, TV
              shows, and more.
            </h1>
          </Grid>
          <Grid item lg={4}  className="descriptionContainer">
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              className="startedBtn"
              variant="contained"
            >
              GET STARTED&nbsp;&nbsp;<ArrowForwardIosIcon className="startedIcon" />
            </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
