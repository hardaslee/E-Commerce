import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Shop from "./pages/Shop";
import Hats from "./pages/Hats";
import Watches from "./pages/Watches";
import Sunglasses from "./pages/Sunglasses";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/Profile";
import AuthService from "./services/auth.service";
import Register from "./components/Register";
import Register2 from "./components/Reg";




function App() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [ccurrentUser, setCCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user) {
            setCCurrentUser(user);
        }
    }, []);

    useEffect(() => {
        setCurrentUser(ccurrentUser);
    }, [ccurrentUser]);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <>
            <Nav currentUser={currentUser} logOut={logOut} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Shop />} />
                    <Route path="/hats" element={<Hats />} />
                    <Route path="/watches" element={<Watches />} />
                    <Route path="/sunglasses" element={<Sunglasses />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/reg" element={<Register2 />} />

                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
