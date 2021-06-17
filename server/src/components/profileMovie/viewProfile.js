import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    img: {
        width: '200px',
        height: '200px',
    },
    typo: {
        marginLeft: 'auto'
    },
}));

const Profile = (props) => {
    const { user } = props;
    const classes = useStyles();

    return (
        <div className={classes.img} style={{ width: "500px", height: "200px", padding: "5%", display: 'flex', flexDirection: "row", background: "#171618", borderRadius: '10px'}} >
            <Avatar className={classes.img}>
                <img style={{ width: "250px", height: "250px", objectFit: "cover" }} src={`http://localhost:3001/${user.image}`} alt="" />
            </Avatar>
            <div style={{ color: 'white', marginLeft: "20px", marginTop: "60px" }}>
                <Typography className={classes.typo}>
                    <strong>Username: {user.username}</strong>
                </Typography>
                <Typography className={classes.typo}>
                    <strong>FullName: {user.firstname} {user.lastname}</strong>
                </Typography>
            </div>
        </div>
    )
}

export default Profile;