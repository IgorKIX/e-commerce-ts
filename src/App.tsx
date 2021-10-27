import React, {useEffect, useState} from 'react';
import {Navbar, ProductsList} from "./components";
import {commerce} from "./lib/commerce";
import {Product} from "@chec/commerce.js/types/product";
import {Cart} from "@chec/commerce.js/types/cart";

function App() {
    // TODO: Maybe add some empty product collection instead of null
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const [cart, setCart] = useState<Cart>({} as Cart);

    // TODO: Better api-call handling
    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchcart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId: string, quantity: number) => {
        const {cart} = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchcart();
    }, []);

    return (
        <div>
            <Navbar totalItems={cart.total_items}/>
            <ProductsList products={products} onAddToCart={handleAddToCart}/>
        </div>
    );
}

export default App;