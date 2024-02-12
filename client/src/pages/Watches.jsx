import React, { useState, useEffect } from "react";
import Promotion from "../components/Promotion.jsx";
import Filter from "../components/Filter.jsx";
import Products from "../components/Products.jsx";
import UserService from "../services/user.service";

function Watches() {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        UserService.getWatches().then(
            (response) => {
                setWatches(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    });

    return (
        <div className="watches">
            <div className="watchesMain">
                <Filter />
                <Products data={watches} />
            </div>
        </div>
    );
}

export default Watches;
