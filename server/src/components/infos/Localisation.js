import React, {useState}  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleMapReact from 'google-map-react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    form: {
        height: '40vh',
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        color: "#FFF",
        backgroundColor: "#11978D",
        margin:"30px"
    },
}));

const Localisation = (props) => {
    const {userL, setLocation, isMarker, handleSubmit} = props;

    const classes = useStyles();

    const [marker, setMarker] = useState(userL);

    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    const handleClick = ({lat, lng}) => {
        setMarker({lat, lng})
        setLocation({lat, lng});
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" color="primary">
                        Localisation
                    </Typography>
                    <Typography color="inherit"> Click to set your location.</Typography>
                    <div  className={classes.form}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key:''}}
                            center={{lat: userL.lat, lng: userL.lng}}
                            defaultZoom={13}
                            onClick={handleClick}
                        >
                        {marker && isMarker === true && <AnyReactComponent
                            lat={marker.lat}
                            lng={marker.lng}
                            text={<RoomRoundedIcon color="secondary"/>}
                        />}
                        </GoogleMapReact>
                    </div>
                    <Button  onClick={handleSubmit}  variant="contained" type="submit"  name="submit" value="ok" style={{ color: "#C51162" }}>Get</Button>
                </div>
        </Container>
    );
}

export default Localisation;