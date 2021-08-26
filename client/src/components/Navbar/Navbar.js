import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import useStyle from './styles';
import {AppBar, Toolbar, Typography,Button,Avatar} from "@material-ui/core";
import memories from "../../images/memories.png";
import {Link,useHistory,useLocation} from "react-router-dom";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

const Navbar = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyle();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        if (token){
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} sr={user.result.imageUrl}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ):(
                        <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;