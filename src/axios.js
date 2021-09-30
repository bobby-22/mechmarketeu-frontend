import axios from "axios";

const djangoAPI = axios.create({
    baseURL: "https://api.mechmarket.eu",
    withCredentials: true,
});

export { djangoAPI };
