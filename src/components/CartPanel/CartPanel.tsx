import React from 'react';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom"
import useStyles from "./styles";
import {Cart} from "@chec/commerce.js/types/cart";
import CartItem from "./components/CartItem";

interface CartPanelProps {
    cart: Cart;
    handleUpdateCartQty: Function;
    handleRemoveFromCart: Function;
    handleEmptyCart: Function
}

function CartPanel({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}: CartPanelProps) {
    const isEmpty = cart.line_items ? !cart.line_items.length : false;
    const classes = useStyles();

    console.log(cart)

    const EmptyCart = (): JSX.Element => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart,
            <Link to="/" className={classes.link}> start adding some</Link>!
        </Typography>
    )

    const FilledCart = (): JSX.Element => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained"
                            color="secondary" onClick={() => handleEmptyCart()}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained"
                            color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return <>Loading...</>;

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your shopping Cart:</Typography>
            {isEmpty ? <EmptyCart/> : <FilledCart/>}
        </Container>
    );
}

export default CartPanel;