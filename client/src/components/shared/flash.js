import React from 'react';
import Alert from '@material-ui/lab/Alert'
// import Snackbar from '@material-ui/core/Snackbar';

const Flashmsg = (props) => {
    // const [open, setOpen] = React.useState(false);


  
    // const handleClose = (event, reason) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }
  
    //   setOpen(false);
    // };

    const {msg ,variant} = props;
    return (
        // <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity={variant} elevation={6} variant="filled">{msg}</Alert>
        // </Snackbar>
    );
}

export default Flashmsg;