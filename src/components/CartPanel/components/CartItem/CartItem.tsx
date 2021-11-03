import React from 'react';
import useStyles from "./styles";
import {LineItem} from "@chec/commerce.js/types/line-item";
import {Card, CardActions, CardContent, CardMedia, Typography, Button} from "@material-ui/core";

interface CartItemProps {
    item: LineItem;
    handleUpdateCartQty: Function;
    handleRemoveFromCart: Function;
}

// TODO: Add context instead of prop drilling
function CartItem({item, handleUpdateCartQty, handleRemoveFromCart}: CartItemProps) {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.image?.url} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    );
}

export default CartItem;