import React, { useState } from "react";
import "./signup.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import renderField from "../shared/TextField";
import Avatar from "@material-ui/core/Avatar";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Logo from "../../image/logo.png";

export default function Signup(props) {
  const [imgUrl, setimgUrl] = useState(null);
  const { handleSubmit, status, err, fileChangedHandler } = props;
  const renderPicture = ({ input, meta: { touched, error } }) => {
    return (
      <div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={(event) => {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
              setimgUrl(reader.result);
            };
            reader.readAsDataURL(file);
            fileChangedHandler(event, input);
          }}
        />
        {imgUrl && (
          <Avatar style={{ width: "250px", height: "250px" }}>
            <img
              style={{ width: "250px", height: "250px" }}
              src={imgUrl}
              alt=""
            />
          </Avatar>
        )}
        <label htmlFor="icon-button-file">
          <Button
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <AddPhotoAlternateIcon style={{ width: "50px", height: "50px" }} />
          </Button>
        </label>
        <div>
          {touched && error && (
            <div style={{ fontSize: "12px", color: "rgb(244, 67, 54)" }}>
              {error}
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Grid container className="signupContainer">
        <Grid item sm={12} lg={7} container className="logupContainer">
          <Grid
            item
            container
            xs={12}
            className="inputContainer"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              sm={12}
              lg={10}
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ paddingTop: "25px", paddingBottom: "20px" }}
            >
                <img src={Logo} style={{ width: "50%" }} />
              <Field name="picture" component={renderPicture} />
              <Grid
                container
                item
                xs={12}
                lg={12}
                style={{
                  padding: "0",
                  margin: "0",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* <p>hello</p> */}
                <Grid
                  item
                  xs={6}
                  lg={6}
                  style={{ paddingRight: "5px", margin: "0" }}
                >
                  {/* <p>hello</p> */}
                  <Field
                    name="firstname"
                    className="logupInput"
                    color="secondary"
                    InputProps={{ className: "loginInput" }}
                    InputLabelProps={{ className: "loginInputLabel" }}
                    component={renderField}
                    label="First Name"
                    type="text"
                    rows="1"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={6}
                  style={{ paddingLeft: "5px", marginLeft: "0" }}
                >
                  {/* <p>hello</p> */}
                  <Field
                    name="lastname"
                    className="logupInput"
                    color="secondary"
                    InputProps={{ className: "loginInput" }}
                    InputLabelProps={{ className: "loginInputLabel" }}
                    component={renderField}
                    label="Last Name"
                    type="text"
                    rows="1"
                  />
                </Grid>
              </Grid>
              <Field
                name="username"
                className="logupInput"
                color="secondary"
                InputProps={{ className: "loginInput" }}
                InputLabelProps={{ className: "loginInputLabel" }}
                component={renderField}
                label="Username"
                type="text"
                rows="1"
                style={{ height: "100%" }}
              />

              <Field
                name="email"
                component={renderField}
                label="Email"
                type="email"
                rows="1"
                className="logupInput"
                color="secondary"
                InputProps={{ className: "loginInput" }}
                InputLabelProps={{ className: "loginInputLabel" }}
              />
              <Field
                name="password"
                component={renderField}
                label="Password"
                type="password"
                rows="1"
                color="secondary"
                className="logupInput"
                InputProps={{ className: "loginInput" }}
                InputLabelProps={{ className: "loginInputLabel" }}
              />
              <Field
                name="confirmPassword"
                component={renderField}
                label="ConfirmPassword"
                type="password"
                rows="1"
                color="secondary"
                className="logupInput"
                InputProps={{ className: "loginInput" }}
                InputLabelProps={{ className: "loginInputLabel" }}
              />
              <div style={{ height: 30 }} />
              <Button
                variant="contained"
                color="secondary"
                className="logupBtn"
                onClick={handleSubmit}
              >
                Register
              </Button>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button color="secondary" className="registerBtn">
                  Login
                </Button>
              </Link>
            </Grid>
          </Grid>
          <div style={{ height: 50 }} />
        </Grid>
      </Grid>
    </>
  );
}
