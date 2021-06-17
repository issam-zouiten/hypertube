import React, {useState } from 'react';
import {connect} from "react-redux";
import Nav from '../../components/Navbar';
import Profile from '../../containers/profile';
import MyMenu from '../../components/shared/modal';
import { ClearUserInformation } from "../../actions/logoutAction";

const NavBarContainer = (props) => {
    const {user,handleLogout} = props;

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleProfileOpen = () => {
        setOpen(true);
    }
    return(
        <>
            <Nav handleProfileOpen={handleProfileOpen} handleLogout={handleLogout} user={user}/>
            {open && <MyMenu  isOpen={open}  handleClose={handleClose}>
                <Profile user={user}/>
            </MyMenu>}
        </>
    )
}

const mapStateToProps = (state) => (
{
    "user" : state.user,

});
const mapDispatchToProps = {
    "ClearUserInformation": ClearUserInformation,

};
const mergeProps = (stateProps, dispatchProps, otherProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...otherProps, 
    "handleLogout" : () => {
        dispatchProps.ClearUserInformation();
    }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavBarContainer);
 