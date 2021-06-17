import React from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import RegisterUser from '../containers/Register';
import loginUser from '../containers/Login';
import confirme from '../containers/emailConfirmation';
import NotFoundPage from '../NotFoundPage';
import ResetPassword from '../containers/resetP';
import ForgotPassword from '../containers/Forgot';
import homePage from '../containers/HomePage';
import omniAuth from '../containers/Login/omniAuth';
import intro from '../components/intro/intro';
import ProfileMovie from '../containers/profileMovie'
import WatchList from '../containers/watchList'

const Routes = (props) => {
    const {user} = props;
    return (
            <Switch>
                <Route exact path="/register" component={user === null ? RegisterUser  :  homePage} />
                <Route exact path="/login" component={user === null ? loginUser  : homePage} />
                <Route exact path="/confirme/:token" component={user === null ? confirme  : homePage} />
                <Route exact path="/resetPassword/:token" component={user === null ? ResetPassword  : homePage} />
                <Route exact path="/forgotPassword" component={user === null ? ForgotPassword  : homePage} />
                <Route exact path="/home" component={user === null ? loginUser  : homePage} />
                <Route exact path="/view/:imdb" component={user === null ? loginUser : ProfileMovie} />
                <Route exact path="/omniAuth/:token" component={omniAuth} />
                <Route exact path="/watchList" component={user !== null ? WatchList : loginUser} />
                <Route exact path="/" component={user === null ? intro  : homePage} />
                <Route exact path="" component={NotFoundPage} />
            </Switch>
    )
}
const mapStateToProps = (state) => (
    {
        'user': state.user,
    });
export default connect(mapStateToProps)(Routes);