import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import WatchList from "../../components/watchList";
import { getSeenMovies } from '../../actions/moviesAction';
import { useHistory } from "react-router-dom";
import { ClearUserInformation } from "../../actions/logoutAction";

const WatchListContainer = (props) => {
    let history = useHistory();
    const { watchList, getSeenMovies, user, handleLogout } = props;

    useEffect(() => {
        getSeenMovies(user.id)
    }, []);

    const handleMovie = (data) => {
        console.log(data,'gchgcghchgcghchg')
        history.push(`/view/${data.imdb}`);
    }
    return (
        <>
            <WatchList
                movies={watchList}
                handleMovie={handleMovie}
                handleLogout={handleLogout}
            />
        </>
    )
}
const mapStateToProps = (state) => (
    {
        "user": state.user,
        "watchList": state.watchList
    });
const mapDispatchToProps = {
    "getSeenMovies": getSeenMovies,
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WatchListContainer);