import React from "react";
import Card from "./Card";

function Products(props) {
    const productCards = props.data.map((item) => {
        return <Card key={item.id} item={item} />;
    });

    return (
        <div className="products">
            <span>Sort By &#8623;</span>
            <div className="productsContainer">{productCards}</div>
        </div>
    );
}

export default Products;
