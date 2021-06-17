import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import "./navbar.css";
import { Avatar } from "@material-ui/core";
import Logo from '../../image/logo.png';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';

const categories = [
  { value: "animation", label: "Animation" },
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "horror", label: "Horror" },
  { value: "music", label: "Music" },
  { value: "romance", label: "Romance" },
  { value: "sci-Fi", label: "Sci-Fi" },
  { value: "thriller", label: "Thriller" },
];

const sortBy = [
  { label: "Year", value: "year" },
  { label: "Popularity", value: "seeds" },
  { label: "Date added", value: "dateadded" },
  { label: "Title", value: "title" },
];
function NavBar(props) {
  const { initializeFilter, handleProfileOpen, user, handleLogout, handleSubmitSearch, handleChangeSearch, handleChangeCategory, handleChangeSort,  handleKeyDown, HandleHome} = props;
  const [sort, setSort] = React.useState('none');
  const [category, setCategory] = React.useState('none');

  const handleSort = (event) => {
    setSort(event.target.value);
    handleChangeSort(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    handleChangeCategory(event.target.value);
  };
  function myFunction(){
    initializeFilter();
    handleSubmitSearch()
}
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Grid container>
          <Grid item lg={1}>
          <Button onClick={HandleHome}>
            <img src={Logo} style={{ width:'100%'}} />
            </Button>
          </Grid>
          <Grid item lg={4}></Grid>
          <Grid item container justify="center" alignItems="center" lg={2}>
            <TextField
              label="Search"
              color="secondary"
              fullWidth
              
              onChange={handleChangeSearch}
              onKeyPress ={handleKeyDown}
              InputProps={{ className: "loginInput",
              endAdornment: (
                <InputAdornment>
                    <SearchIcon style={{ cursor: 'pointer'}} onClick={myFunction}/>
                </InputAdornment> )}}
              InputLabelProps={{ className: "loginInputLabel" }}
            />
          </Grid>
          <Grid item container justify="center" alignItems="center" lg={2}>
            <TextField
              select
              label="Categories"
              color="secondary"
              onChange={handleCategory}
              value={category}
              style={{ width: "30%", marginRight: 10 }}
              InputProps={{className: "loginInput"}}
              InputLabelProps={{ className: "loginInputLabel" }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Sort By"
              color="secondary"
              onChange={handleSort}
              value={sort}
              style={{ width: "30%" }}
              InputProps={{ className: "loginInput" }}
              InputLabelProps={{ className: "loginInputLabel" }}
            >
              {sortBy.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {user && user.token && (
              <Link to={'/watchList'} style={{ textDecoration: 'none', color: 'primary' }} >
                <ListItem button>
                  <ListItemIcon><VisibilityIcon style={{ color: 'white'}} /></ListItemIcon>
                </ListItem>
              </Link>
            )}
          </Grid>
          <Grid item lg={1}></Grid>
          <Grid item container justify="center" alignItems="center" lg={2}>
            {console.log(user)}
            {user && user.token && (
              <>
                <h4 style={{marginRight: 10}}>{user.username}</h4>
                <Avatar alt='profile' src={`http://localhost:3001/${user.image}`} onClick={handleProfileOpen} style={{ cursor: 'pointer', marginRight: 10 }} />
              
                <ExitToAppIcon onClick={handleLogout} />
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
