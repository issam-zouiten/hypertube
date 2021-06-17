import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import "../profile/profile.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ user }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <VisibilityIcon onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{
            width: "100px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid
          container
          className="profilContainer"
          justify="center"
          alignItems="center"
          style={{
            background:
              "linear-gradient(143deg, rgba(65, 64, 65, 1) 0%, rgba(30, 29, 32, 1) 69%)",
          }}
        >
          <Grid item xs={10} lg={7} container className="profileContainer">
            <Grid
              item
              xs={12}
              lg={4}
              className="profileImageContainer"
              container
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                sm={10}
                className="profileUserImage"
              >
                <img
                  alt="profileImg"
                  src={`http://localhost:3001/${user.images[0].path}`}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </Grid>
              <>
                <Grid item sm={10} className="profileFullName">
                  <h1>{user.user.firstname + " " + user.user.lastname}</h1>
                  <h3>{user.user.username}</h3>
                  <h3>{user.user.gender}</h3>
                  <h5>
                    <i className="fas fa-envelope"></i>&nbsp;
                    {user.user.email}
                  </h5>
                  <h4 style={{textAlign: 'center', display: 'flex', flexDirection: 'wrap'}}>
                <i className="fab fa-slack-hash"></i> Tags:&nbsp;
                  {user.tags ? (user.tags.map((tag, i) => (
                      <p  key={i} style={{color: "dimgrey", marginTop: '6px'}}>#{tag.label}&nbsp;</p>
                  ))) : ''}
                </h4>
                </Grid>
              </>
              <Grid item sm={10}></Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              lg={8}
              
            >
              {user.images.map((img, i) => (
                <Grid item key={i} sm={4} style={{ display: "inline", float: "left", padding: "10px"}}>
                  <img
                    alt="userImgs"
                    src={`http://localhost:3001/${img.path}`}
                    style={{
                      width: "100%",
                      height: "25vh",
                      borderRadius: "12px",
                      margin: "2px",
                      boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
