import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Product = ({ product, handleAddToCart }) => {
  const classes = useStyles();
  console.log({ product });
 
  console.log("image", product);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product?.image?.url}
        title={product?.name}
      />
      <CardContent>
        <div className={classes.content}>
          <Typography variant={"h5"} gutterBottom>
            {product?.name}
          </Typography>
          <Typography variant={"h5"}>
            {product?.price?.formatted_with_code}
          </Typography>
        </div>
        
        <Typography
          variant={"body2"}
          color={"textSecondary"}
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label={"Add to Cart"}
          onClick={() => handleAddToCart(product?.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
