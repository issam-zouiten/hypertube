import React from "react";
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";

const sharedAlert = (props) => {
  const { text, color } = props.alert;

  setTimeout(() => props.dispatch({
      type: 'RESET_ALERT'
  }), 3000)
  if (text === "") return <></>;
  return (
    <>
    {console.log('ha hona')}
    <Alert severity={color} style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%"
      }}>{text}</Alert>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps)(sharedAlert);
