import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import SignIn from "../components/sign-in";
import Register from "../components/Register";
import LoginComp from "../components/LoginComp";
import Delete from "../components/Delete";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Login() {
    const {t, i18n } = useTranslation();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch("http://localhost:5000/register", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="login">
            <div className="loginInfo">
                <h1>{t('login.join')}</h1>
                <h2>{t('login.member')}</h2>
                <h2>{t('login.login')}</h2>
            </div>
            <div>
                {/* <Register /> */}
                <LoginComp />
                
            </div>
        </div>
    );
}

export default Login;
