import { connectRouter } from "connected-react-router";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import userReducer from './userReducer';
import moviesReducer from './moviesReducer';
import resetPasswordReducer from "./resetPReducer";
import movieDetails from './movieDetails';
import similarMovies from './similarMovies'
import watchList from './watchList'
import commentsReducer from './commentsReducer';
import alertReducer from './alertReducer';


const combinedReducer = (history)=> combineReducers({
    "router" : connectRouter(history),
    "register" : registerReducer,
    "login": loginReducer,
    "user" : userReducer,
    "movies": moviesReducer,
    "resetPassword": resetPasswordReducer,
    "movieDetails" : movieDetails,
    "similarMovies" : similarMovies,
    "watchList" : watchList,
    "movieDetails": movieDetails,
    "similarMovies": similarMovies,
    "comments": commentsReducer,
    "alert": alertReducer,
    form
});
export default combinedReducer;