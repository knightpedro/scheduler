import axios from "axios";
import authService from "../components/api-authorization/AuthorizeService";

export const configureAxios = () => {
    axios.interceptors.request.use(
        async config => {
            const token = await authService.getAccessToken();
            config.headers = !token ? {} : { Authorization: `Bearer ${token}` };
            return config;
        },
        error => Promise.reject(error)
    );
};
