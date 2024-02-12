import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import '../assets/style.css';

const Reg = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const handleRegister = (data) => {
        setMessage("");
        setSuccessful(false);

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        AuthService.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setTimeout(() => navigate("/login"), 4000);
            },
            (error) => {
                const resMessage = error.response?.data?.message || error.message || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="wrapper" style={{ backgroundImage: "url('images/bg-registration-form-2.jpg')" }}>
            <div className="inner">
                <form onSubmit={handleSubmit(handleRegister)}>
                    <h3>Registration Form</h3>

                    {/* First Name (dummy field, not used in registration) */}
                    <div className="form-group">
                        <div className="form-wrapper">
                            <label>First Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-wrapper">
                            <label>Last Name</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="form-wrapper">
                        <label>Username</label>
                        <input
                            {...register("username", { required: true, minLength: 3, maxLength: 15 })}
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            value={username}
                            onChange={onChangeUsername}
                        />
                        {errors.username && <div className="invalid-feedback">Username is required (3-15 characters).</div>}
                    </div>

                    {/* Email */}
                    <div className="form-wrapper">
                        <label>Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={onChangeEmail}
                        />
                        {errors.email && <div className="invalid-feedback">Email is required.</div>}
                    </div>

                    {/* Password */}
                    <div className="form-wrapper">
                        <label>Password</label>
                        <input
                            {...register("password", { required: true, minLength: 6 })}
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={onChangePassword}
                        />
                        {errors.password && <div className="invalid-feedback">Password is required (min 6 characters).</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-wrapper">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                        />
                    </div>

                    {/* Terms and Conditions Checkbox (dummy, not used in registration) */}
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" /> I accept the Terms of Use & Privacy Policy.
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Register Now</button>
                    </div>

                    {/* Messages */}
                    {message && (
                        <div className={`alert ${successful ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Reg;
