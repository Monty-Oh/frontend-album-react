import axios from "axios";
import {DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE} from "../constants";

export const axiosInstance = axios.create({
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * 요청 인터셉터
 */
axiosInstance.interceptors.request.use(
    function (config) {
        //  TODO: 추후 인증 토큰 추가
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

/**
 * 응답 인터셉터
 */
// export const setupAxiosResponseInterceptors = (dispatch) => {
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const {code = DEFAULT_ERROR_CODE, message = DEFAULT_ERROR_MESSAGE} = error.response.headers;
        const decodedMessage = decodeURI(message).replace(/\+/g, " ");
        alert(`[${code}] ${decodedMessage}`);
        return Promise.reject(error);
    }
)
// }