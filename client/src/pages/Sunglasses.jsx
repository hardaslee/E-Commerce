import React, { useState, useEffect } from "react";
import Promotion from "../components/Promotion.jsx";
import Filter from "../components/Filter.jsx";
import Products from "../components/Products.jsx";
import UserService from "../services/user.service";

function Sunglasses() {
    const [sunglasses, setSunglasses] = useState([]);

    useEffect(() => {
        UserService.getSunglasses().then(
            (response) => {
                setSunglasses(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);
    return (
        <div className="sunglasses">
            <div className="sunglassesMain">
                <Filter />
                <Products data={sunglasses} />
            </div>
        </div>
    );
}

export default Sunglasses;
