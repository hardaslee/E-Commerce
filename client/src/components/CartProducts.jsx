import React from "react";
import CartCard from "./CartCard";

function CartProducts(props) {
    const productCards = props.data.map((item) => {
        return <CartCard key={item.id} item={item} />;
    });

    return (
        <div className="products">
            <span>Sort By &#8623;</span>
            <div className="productsContainer">{productCards}</div>
        </div>
    );
}

export default CartProducts;
