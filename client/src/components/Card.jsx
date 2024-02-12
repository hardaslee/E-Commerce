import React from "react";
import CartService from "../services/cart.service";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Card(props) {
    const {t, i18n } = useTranslation();
    const handleAddToCart = (product) => {
        CartService.addToCart(product);
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
                onClick={() => handleAddToCart(props.item)}
            >
                {t('main.card')}
            </button>
        </div>
    );
}

export default Card;
