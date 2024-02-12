import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Delete() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleDelete = (data) => {
        console.log(data);

        setMessage("");
        AuthService.delete(username).then(
            (resp) => {
                setMessage(resp.data.message);
                console.log(resp);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
                setMessage(resMessage);
            }
        );
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleSubmit(handleDelete)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">
                            <span>Delete</span>
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
            </div>
        </div>
    );
}
