import React, { useEffect, useState } from "react";
import Top from "../components/Top";
import ShopToday from "../components/ShopToday";
import Card from "../components/Card";
import Promotion from "../components/Promotion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UserService from "../services/user.service";
import Discover from "../components/Discover";
import Exclusive from "../components/Exclusive";

function Shop() {
    const [data, setData] = useState({ hats: [], sunglasses: [], watches: [] });
    const [hatIndex, setHatIndex] = useState(0);
    const [sunglassesIndex, setSunglassesIndex] = useState(0);
    const [watchIndex, setWatchIndex] = useState(0);

    useEffect(() => {
        UserService.getHats().then(
            (response) => {
                setData((prevState) => ({
                    ...prevState,
                    hats: response.data,
                }));
            },
            (error) => {
                console.log(error);
            }
        );
        UserService.getSunglasses().then(
            (response) => {
                setData((prevState) => ({
                    ...prevState,
                    sunglasses: response.data,
                }));
            },
            (error) => {
                console.log(error);
            }
        );
        UserService.getWatches().then(
            (response) => {
                setData((prevState) => ({
                    ...prevState,
                    watches: response.data,
                }));
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const itemPerPage = 3;
    const maxHatIndex = data.hats.length - itemPerPage;
    const maxSunglassesIndex = data.sunglasses.length - itemPerPage;
    const maxWatchIndex = data.watches.length - itemPerPage;

    const slideHats = (direction) => {
        if (direction === "left" && hatIndex > 0) {
            setHatIndex(hatIndex - itemPerPage);
        } else if (direction === "right" && hatIndex < maxHatIndex) {
            setHatIndex(hatIndex + itemPerPage);
        }
    };

    const slideSunglasses = (direction) => {
        if (direction === "left" && sunglassesIndex > 0) {
            setSunglassesIndex(sunglassesIndex - itemPerPage);
        } else if (
            direction === "right" &&
            sunglassesIndex < maxSunglassesIndex
        ) {
            setSunglassesIndex(sunglassesIndex + itemPerPage);
        }
    };

    const slideWatches = (direction) => {
        if (direction === "left" && watchIndex > 0) {
            setWatchIndex(watchIndex - itemPerPage);
        } else if (direction === "right" && watchIndex < maxWatchIndex) {
            setWatchIndex(watchIndex + itemPerPage);
        }
    };

    return (
        <div className="shop">
            <ShopToday />
            <Top />
            <Promotion />

            <div className="CardContainer">
                <div className="arrows">
                    <button
                        className="arrows"
                        onClick={() => slideHats("left")}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="fa-icon"
                        />
                    </button>
                    <button
                        className="arrows"
                        onClick={() => slideHats("right")}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="fa-icon"
                        />
                    </button>
                </div>
                <div className="hatCardsContainer">
                    {data.hats
                        .slice(hatIndex, hatIndex + itemPerPage)
                        .map((item) => (
                            <Card
                                key={item.id}
                                item={item}
                                className={
                                    hatIndex > 0 ? "slide-right" : "slide-left"
                                }
                            />
                        ))}
                </div>
            </div>
            <Exclusive />

            <div className="arrows">
                <button className="arrows" onClick={() => slideHats("left")}>
                    <FontAwesomeIcon icon={faArrowLeft} className="fa-icon" />
                </button>
                <button className="arrows" onClick={() => slideHats("right")}>
                    <FontAwesomeIcon icon={faArrowRight} className="fa-icon" />
                </button>
            </div>
            <div className="sunglassesCardsContainer">
                {data.sunglasses
                    .slice(sunglassesIndex, sunglassesIndex + itemPerPage)
                    .map((item) => (
                        <Card
                            key={item.id}
                            item={item}
                            className={
                                sunglassesIndex > 0
                                    ? "slide-right"
                                    : "slide-left"
                            }
                        />
                    ))}
            </div>
            <Discover />

            <div className="arrows">
                <button className="arrows" onClick={() => slideHats("left")}>
                    <FontAwesomeIcon icon={faArrowLeft} className="fa-icon" />
                </button>
                <button className="arrows" onClick={() => slideHats("right")}>
                    <FontAwesomeIcon icon={faArrowRight} className="fa-icon" />
                </button>
            </div>
            <div className="watchCardsContainer">
                {data.watches
                    .slice(watchIndex, watchIndex + itemPerPage)
                    .map((item) => (
                        <Card
                            key={item.id}
                            item={item}
                            className={
                                watchIndex > 0 ? "slide-right" : "slide-left"
                            }
                        />
                    ))}
            </div>
        </div>
    );
}

export default Shop;
