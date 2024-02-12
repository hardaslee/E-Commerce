import React from "react";
import CartService from "../services/cart.service";

function CartCard(props) {
    const handleRemoveFromCart = (product) => {
        CartService.removeFromCart(product);
    };
    return (
        <div className="card no-border-card">
            <img src={`${props.item.imageUrl}`} className="card--image" />
            <p className="card--title">{props.item.name}</p>
            <p className="card--desc">Minimalistic</p>
            <p className="card--price">
                <span className="bold">${props.item.price}</span>
            </p>
            <button
                className="card--button"
                onClick={() => handleRemoveFromCart(props.item.name)}
            >
                Remove from Cart
            </button>
        </div>
    );
}

export default CartCard;
