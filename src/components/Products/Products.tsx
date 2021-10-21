import React from 'react';
import {Grid} from "@material-ui/core";
import {IProduct} from "./components/Product/Product"
import Product from "./components/Product";

function Products() {
    const products: IProduct[] = [
        {
            id: 1,
            name: "Pen",
            description: "Some pen.",
            price: "$5",
            image: "img"
        },
        {
            id: 2,
            name: "Glue",
            description: "Some glue.",
            price: "$10",
            image: "img"
        }];

    return (
        <main>
            <Grid container justifyContent="center" spacing={4}>
                {products.map(item =>
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={item}/>
                    </Grid>
                )}
            </Grid>
        </main>
    );
}

export default Products;