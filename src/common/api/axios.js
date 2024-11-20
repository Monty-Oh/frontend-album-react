import axios from "axios";
import {
    AUTHENTICATION_EXPIRED_ERROR_CODE,
    AUTHORIZATION,
    DEFAULT_ERROR_CODE,
    DEFAULT_ERROR_MESSAGE,
    REFRESH_TOKEN
} from "../constants";
import store, {authAction, authSelector} from "../../store";

export const axiosInstance = axios.create({
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * 요청 인터셉터
 * 요청 시 헤더에 인증 관룐 토큰을 포함한다.
 */
axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = authSelector.selectAccessToken(store.getState());
        const refreshToken = authSelector.selectRefreshToken(store.getState());

        if (accessToken) config.headers[AUTHORIZATION] = accessToken;
        if (refreshToken) config.headers[REFRESH_TOKEN] = refreshToken;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

/**
 * 응답 인터셉터
 * 공통 처리
 * 인증 만료 응답 시 서버로 리프레시 토큰을 담고 재인증 요청을 한다.
 */
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

/**
 * 응답 인터셉터
 * 인증 만료 응답 시 서버로 리프레시 토큰을 담고 재인증 요청을 한다.
 */
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const {code = DEFAULT_ERROR_CODE, message = DEFAULT_ERROR_MESSAGE} = error.response.headers;
        if (code === AUTHENTICATION_EXPIRED_ERROR_CODE) {
            store.dispatch(authAction.logout());
        }

        return Promise.reject(error);
    }
)