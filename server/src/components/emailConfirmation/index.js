import React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Logo from "../../image/logo.png";

export default function confirmatinon(props) {
  return (
    <>
      <Grid
        container
        className="errorContainer"
        justify="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <Grid item lg={3} sm={4} xs={10} container className="confirmeContainer">
          <Grid
            item
            container
            xs={12}
            lg={12}
            className="confirmeinputContainer"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              lg={12}
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Link to="/login" style={{ textDecoration: "none", display: 'flex', justifyContent: "center" }}>
                <img src={Logo} alt="logo" style={{ width: "70%" }} />
              </Link>
              <h3
                className="message"
                style={{ color: "white", padding: "50px", textAlign: "center" }}
              >
                You verify you email successfully. please click the link below
                to login.
              </h3>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" className="logupBtn">
                  Login
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
