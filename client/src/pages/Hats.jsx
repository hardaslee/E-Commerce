import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Promotion from "../components/Promotion";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import Products from "../components/Products";
import UserService from "../services/user.service";

function Hats() {
    const [hats, setHats] = useState([]);

    useEffect(() => {
        UserService.getHats().then(
            (response) => {
                setHats(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <div className="hats">
            <Promotion />
            <div className="hatsMain">
                <Filter />
                <Products data={hats} />
            </div>
        </div>
    );
}

export default Hats;
