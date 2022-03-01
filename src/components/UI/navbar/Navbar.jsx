import React from 'react';
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={classes.myNavbar}>
            <div className={classes.myNavbarLinks}>
                <Link className={classes.myNavbarLink} to='/about'>About</Link>
                <Link className={classes.myNavbarLink} to='/posts'>Posts</Link>
            </div>
        </div >
    );
};

export default Navbar;