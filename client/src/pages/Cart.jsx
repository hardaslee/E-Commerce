import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import CartService from "../services/cart.service";
import CartProducts from "../components/CartProducts";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = CartService.getCart();
        setCartItems(items);
    }, []);

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <div className="cart">
            <div className="cartItems">
                <h1>Cart Items</h1>
                <div className="items">
                    <CartProducts data={cartItems} />
                </div>
            </div>
            <div className="orderSummary">
                <h1>Order Summary</h1>
                <div className="summary">
                    <div>
                        <div>
                            <h3>Subtotal: </h3>
                            <p className="subtotal"></p>
                        </div>
                        <div>
                            <h3>Delivery: </h3>
                            <p className="delivery"></p>
                        </div>
                        <div>
                            <h3>Taxes: </h3>
                            <p className="taxes"></p>
                        </div>
                    </div>
                    <div className="totalAndCheckout">
                        <h3>Total: </h3>
                        <p className="total"></p>
                        <Button variant="primary" type="submit">
                            Checkout as Guest
                        </Button>
                        <Button variant="primary" type="submit">
                            Checkout as Member
                        </Button>
                        <Button variant="primary" type="submit">
                            Paypal
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
