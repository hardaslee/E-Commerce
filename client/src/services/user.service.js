import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/items/";

class UserService {
    getHats() {
        return axios.get(API_URL + "hats");
    }

    getSunglasses() {
        return axios.get(API_URL + "sunglasses");
    }

    getWatches() {
        return axios.get(API_URL + "watches");
    }
}

export default new UserService();
