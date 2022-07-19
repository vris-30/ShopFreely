import React from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveCartItems,
  handleEmptyItems,
}) => {
  const classes = useStyles();
  const isEmpty = cart?.line_items?.length === 0;

  const EmptyCart = () => (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      minHeight={"100vh"}
    >
      <Typography
        variant={"h3"}
        className={classes.title}
        style={{ textAlign: "center" }}
      >
        Hey, it feels so light!!
      </Typography>
      <Typography variant={"h5"}>
        There is nothing in your bag, Let's add some items...
      </Typography>
      <Button
        size={"small"}
        variant={"contained"}
        color={"primary"}
        component={Link}
        to="/"
        className={classes.title}
      >
        Add items!!
      </Button>
    </Box>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart?.line_items?.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveCartItems={handleRemoveCartItems}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart?.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyItems}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
