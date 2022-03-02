import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';
import classes from "./Navbar.module.css";

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
    }

    return (
        <div className={classes.myNavbar}>
            <MyButton style={{ color: "white" }} onClick={logout}>Log out</MyButton>
            <div className={classes.myNavbarLinks}>
                <Link className={classes.myNavbarLink} to='/about'>About</Link>
                <Link className={classes.myNavbarLink} to='/posts'>Posts</Link>
            </div>
        </div >
    );
};

export default Navbar;