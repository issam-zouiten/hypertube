import React from "react";
import Grid from "@material-ui/core/Grid";
import AddBtn from "./img/plus.svg";
import RemoveBtn from "./img/remove.svg";
import ProfileBtn from "./img/profile.svg";

export default function Photos(props) {
  const {
    fileChangedHandler,
    images,
    deletePicture,
    setProfilePicture,
  } = props;

  return (
    <Grid container item sm={12} style={{ width: "40vw" }} spacing={1}>
      {images.isImages &&
        images.images.map((img, i) => (
          <Grid item container key={i} sm={4} className="PhotosContainer">
            <Grid
              item
              container
              key={i}
              sm={12}
              className="userImage"
              justify="flex-end"
              alignItems="flex-end"
              style={{
                backgroundImage: `url(http://localhost:3001/${img.path})`,
                backgroundSize: "cover",
              }}
            >
              <input
                type="file"
                name="input"
                id="input"
                key={i}
                accept="image/*"
                onChange={fileChangedHandler}
                hidden
              />
              <img
                src={ProfileBtn}
                className="addBtn"
                id={i}
                alt="userImage"
                onClick={(e) => setProfilePicture(img.id, img.isProfilePic)}
              />
              <img
                src={RemoveBtn}
                className="addBtn"
                id={i}
                alt="userImage"
                onClick={(e) => deletePicture(img.id, img.isProfilePic)}
              />
            </Grid>
          </Grid>
        ))}
        {images.isImages &&
        images.images.length < 5 ? (
      <Grid item container sm={4} className="PhotosContainer">
        <Grid
          item
          container
          sm={12}
          className="userImage"
          justify="flex-end"
          alignItems="flex-end"
          style={{
            backgroundSize: "cover",
          }}
        >
          <input
            type="file"
            name="input"
            id="input"
            accept="image/*"
            onChange={fileChangedHandler}
            hidden
          />
          <label htmlFor="input" className="uploadInput">
            <img src={AddBtn} className="addBtn" alt="userImage" />
          </label>
        </Grid>
      </Grid>) : ""}
        {!images.isImages ? (
      <Grid item container sm={4} className="PhotosContainer">
        <Grid
          item
          container
          sm={12}
          className="userImage"
          justify="flex-end"
          alignItems="flex-end"
          style={{
            backgroundSize: "cover",
          }}
        >
          <input
            type="file"
            name="input"
            id="input"
            accept="image/*"
            onChange={fileChangedHandler}
            hidden
          />
          <label htmlFor="input" className="uploadInput">
            <img src={AddBtn} className="addBtn" alt="userImage" />
          </label>
        </Grid>
      </Grid>) : ""}
    </Grid>
  );
}
