import React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function notFound(props) {
  return (
    <>
      <Grid
        container
        className="errorContainer"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3} container className="loginContainer">

          <Grid
            item
            container
            xs={12}
            lg={12}
            className="loginInputContainer"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              lg={10}
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <h1 className="logo">Page Not Found</h1>
              <h3 className="message">Please go back to the right path</h3>
              <div style={{ height: 30 }} />

              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  className="loginBtn"
                  color="secondary"
                >
                  Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
