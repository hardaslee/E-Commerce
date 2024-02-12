import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signInWithGooglePopup } from "../utils/firebase.utils";
import { Link } from "react-router-dom";
import '../assets/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function LoginComp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const handleLogin = (data) => {
        setMessage("");
        setLoading(true);

        AuthService.login(username, password).then(
            () => {
                navigate("/profile");
                window.location.reload();
            },
            (error) => {
                const resMessage = error.response?.data?.message || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        // Add additional logic for Google sign-in if needed
    };

    return (
        <div className="wrapper customLogin" style={{ backgroundImage: "url('images/bgz2.jpg')" }}>
            <div className="inner bgLogin ">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <h3 id="loginTitle">{t('login.login')}</h3>

                    {/* Username */}
                    <div className="form-wrapper">
                        <label id="">{t('login.userName')}</label>
                        <input
                            {...register("username", { required: "Username is required" })}
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            value={username}
                            onChange={onChangeUsername}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                    </div>

                    {/* Password */}
                    <div className="form-wrapper">
                        <label>{t('login.password')}</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={onChangePassword}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    {/* Login Button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block regANDlog" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            <span>{t('login.login')}</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>

                {/* Additional options */}
                <div className="text-center loginOptions">
                    <p>
                        {t('login.notMember')} <Link to="/register">{t('login.register')}</Link>
                    </p>
                    <p>{t('login.or')}</p>
                    <button onClick={logGoogleUser} className="btn btn-link">
                    <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginComp;
