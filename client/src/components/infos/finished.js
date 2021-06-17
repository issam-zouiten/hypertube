import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom"
import Done from "./img/done.svg"

export default function finished(props) {
  const { handle } = props;
  return (
    <>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item container sm={12} className="DoneContainer">
            <img src={Done} alt="done" className="doneImg" />
        </Grid>
        <Grid item container sm={12} className="DoneContainer" justify="center" alignItems="center">
            <h1 className="message">You completed your profile information successfully</h1>
        </Grid>
        <Grid item container sm={12} justify="center" alignItems="center">
          <Link to="/browsing" >
            <Button className="profileBtn" onClick={handle} >Done</Button></Link>
        </Grid>
      </Grid>
    </>
  );
}
