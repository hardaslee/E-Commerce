import React from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";


function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === "en" ? "fr" : "en";
        i18n.changeLanguage(newLanguage);
    };

    return (
        <span onClick={toggleLanguage} style={{ cursor: "pointer" }}>
            {i18n.language === "en" ? "FR" : "EN"}
        </span>
    );
}

function Nav(props) {
    const { t } = useTranslation();
    console.log(props);
    return (
        <nav className="topNav">
            <Link to="/">
                <img className="logo" src="/images/logo2.png" alt="Logo" />
            </Link>

            <div className="pageLinks">
                <ul className="navItemList">
                    <li className="navItem">
                        <Link to="/hats">
                            <p className="navlinks">{t("main.hats")}</p>
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link to="/watches">
                            <p className="navlinks">{t("main.watches")}</p>
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link to="/sunglasses">
                            <p className="navlinks">{t("main.glasses")}</p>
                        </Link>
                    </li>
                </ul>

                <div className="navRight">
                    {props.currentUser ? (
                        <Link to="/profile">
                            <FaUsers className="loginIcon" />
                        </Link>
                    ) : (
                        <Link to="/login">
                            <FaUsers className="loginIcon" />
                        </Link>
                    )}
                    <Link to="/cart">
                        <TiShoppingCart className="shoppingCart" />
                    </Link>
                    {props.currentUser ? (
                        <button className="logOutButton" onClick={props.logOut}>
                              Log Out
                        </button>
                    ) : null}
                    <LanguageToggle />
                </div>
            </div>
        </nav>
    );
}

export default function WrappedApp({ currentUser, logOut }) {
    return (
        <Suspense fallback="">
            <Nav currentUser={currentUser} logOut={logOut} />
        </Suspense>
    );
}
