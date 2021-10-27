import React from 'react';
import {Grid} from "@material-ui/core";
import ProductCart from "./components/ProductCart";
import {Product} from "@chec/commerce.js/types/product";
import useStyles from "./styles";

interface ProductsListProps {
    products: Product[],
    onAddToCart: Function
}

function ProductsList({products, onAddToCart}: ProductsListProps) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justifyContent="center" spacing={4}>
                {products.map(item =>
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCart product={item} onAddToCart={onAddToCart}/>
                    </Grid>
                )}
            </Grid>
        </main>
    );
}

export default ProductsList;