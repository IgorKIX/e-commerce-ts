import React, {useEffect, useState} from 'react';
import {CartPanel, Navbar, ProductsList} from "./components";
import {commerce} from "./lib/commerce";
import {Product} from "@chec/commerce.js/types/product";
import {Cart} from "@chec/commerce.js/types/cart";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    // TODO: Maybe add some empty product collection instead of null
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const [cart, setCart] = useState<Cart>({} as Cart);

    // TODO: Better api-call handling
    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    // Cart

    const fetchcart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId: string, quantity: number) => {
        const {cart} = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const handleUpdateCartQty = async (productId: string, quantity: number) => {
        const {cart} = await commerce.cart.update(productId, {quantity});

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId: string) => {
        const {cart} = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchcart();
    }, []);

    return (
        <Router>

            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <ProductsList products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <CartPanel
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;