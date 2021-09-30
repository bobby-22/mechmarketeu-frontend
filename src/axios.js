import axios from "axios";

const djangoAPI = axios.create({
    baseURL: "https://mechmarketeu.herokuapp.com/",
    withCredentials: true,
});

export { djangoAPI };
