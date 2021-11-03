// @flow
import * as React from 'react';
import useStyles from "./styles";
import {AppBar, Badge, IconButton, Toolbar, Typography} from "@material-ui/core";
// TODO: Fix png import TSError
// @ts-ignore
import logo from "../../assets/shop.png";
import {ShoppingCart} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom";

interface NavbarProps {
    totalItems: number
}

export const Navbar = ({totalItems}: NavbarProps) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Ecommerce-ts" height="25px" className={classes.image}/>
                        Ecommerce-ts
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === "/" && (
                        <div>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;