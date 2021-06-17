import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Home from "../../components/Home";
import {GetMovies} from '../../actions/moviesAction';
import { useHistory } from "react-router-dom";
import {resetMoviesState} from '../../actions/resetStateAction';
import Nav from '../../components/Navbar';
import Profile from '../../containers/profile';
import MyMenu from '../../components/shared/modal';
import { ClearUserInformation } from "../../actions/logoutAction";

const HomeContainer = (props) => {
    let history = useHistory();
    const {movies, getMovies, reset , user,handleLogout} = props;
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState({
        page: 1,
        title: null,
        sortBy: null,
        category: null,
    });

    const [filter2, setFilter2] = useState({
        page: 1,
        title: null,
        sortBy: null,
        category: null,
    });

    const handleClose = () => {
        setOpen(false);
    };
    const handleProfileOpen = () => {
        setOpen(true);
    }
    useEffect(() => {
        getMovies(filter);
        return () => reset()
    }, []);
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
            if(movies.status === 'success'){
                setFilter({...filter, page: filter.page + 1});
                getMovies({...filter, page: filter.page + 1});
            }
        }
    };
    const initializeFilter = () => {
        setFilter({
            page: 1,
            title: null,
            sortBy: null,
            category: null,
        })
    }
    const handleMovie = (data) => {
        console.log(data)
        document.documentElement.scrollTop = 0;
        if(data.imdb)
            history.push(`/view/${data.imdb}`);
        else
            history.push(`/view/${data.imdb_code}`);
    }
    const handleChangeSearch = (e) => {
        setFilter({
            page: 1,
            title: e.target.value,
            sortBy: null,
            category: null,
        })
    }
    const handleSubmitSearch = (e) => {
        console.log(filter);
        filter.title && getMovies(filter);
    }
    const handleChangeCategory = (newValue) => {
        // console.log("filter===================wwwww")
        // console.log(newValue)
        setFilter({
            page: 1,
            title: null,
            sortBy: filter.sortBy,
            category: newValue,
        })
        // console.log("filter===================")
        // console.log(filter)
        getMovies({page: 1, title: null, sortBy: filter.sortBy, category: newValue})
    }
    const handleChangeSort = (newValue) => {
        setFilter({
            page: 1,
            title: null,
            sortBy: newValue,
            category: filter.category,
        })
        getMovies({page: 1, title: null, sortBy: newValue, category: filter.category})
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            filter.title && getMovies(filter);
        }
      }

      const HandleHome = () => {
        getMovies(filter2);
    }
    return (
        <div>
            <>
                <Nav handleProfileOpen={handleProfileOpen} handleLogout={handleLogout} user={user}
                    handleChangeSearch={handleChangeSearch}
                    handleSubmitSearch={handleSubmitSearch}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeSort={handleChangeSort}
                    handleKeyDown={handleKeyDown}
                    initializeFilter={initializeFilter}
                    HandleHome={HandleHome}  
                    />
                    {open && <MyMenu  isOpen={open}  handleClose={handleClose}>
                    <Profile user={user}/>
                </MyMenu>}
             </>
            <Home  
                    movies={movies}
                    // handleChangeSearch={handleChangeSearch}
                    // handleSubmitSearch={handleSubmitSearch}
                    // handleChangeCategory={handleChangeCategory}
                    // handleChangeSort={handleChangeSort}
                    handleMovie={handleMovie}    
                    // initializeFilter={initializeFilter}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            />
        </div>
    )
}
const mapStateToProps = (state) => (
{
    "user": state.user,
    "movies": state.movies,
});
const mapDispatchToProps = {
    "getMovies" : GetMovies,
    "reset": resetMoviesState,
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

export default connect(mapStateToProps,mapDispatchToProps, mergeProps)(HomeContainer);