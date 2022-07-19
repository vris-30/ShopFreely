import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge, 
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/badge.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <AppBar position={"fixed"} color={"inherit"} className={classes.appbar}>
      <Toolbar>
        <Typography
          variant={"h6"}
          color={"inherit"}
          component={Link}
          to="/"
          className={classes.title}
        >
          <img
            src={Logo}
            alt={"Logo"}
            height={"40px"}
            className={classes.image}
          />{" "}
          Shop Freely
        </Typography>
        <div classname={classes.grow} />
        <div className={classes.button}>
          {pathname !== "/cart" && (
            <IconButton
              component={Link}
              to={"/cart"}
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color={"secondary"}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
