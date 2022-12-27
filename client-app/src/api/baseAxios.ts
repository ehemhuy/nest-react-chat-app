import baseAxios from "axios";

baseAxios.interceptors.request.use(function (config) {
    config.withCredentials = true

    return config;
});

export default baseAxios