import React from 'react';
import Hink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

var style = {
  backgroundColor: "transparent",
  textAlign: "center",
  padding: "10px",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  zIndex: "100"
}

var phantom = {
  display: 'block',
  padding: '20px',
//   width: '100%',
}

const Copyright = () => {
    return (
        <Typography variant="body2" color="secondary" align="center">
          {'Copyright © '}
          <Hink color="secondary" href="#">
            HYPERTUBE
          </Hink>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    );
}

const Footer = () => {
  return(
    <div>
      <div style={phantom}/>
      <div style={style}>
        <Copyright />
      </div>  
    </div>      
  );
}

export default Footer;