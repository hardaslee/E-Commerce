import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password,
            })
            .then((resp) => {
                if (resp.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(resp.data));
                }
                return resp.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
        });
    }

    delete(username) {
        return axios.post(API_URL + "delete", {
            username,
        });
    }

    async getCurrentUser() {
        return await JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
