import axios from "axios";
import {
    AUTHENTICATION_EXPIRED_ERROR_CODE,
    AUTHORIZATION_HEADER,
    CONTENT_TYPE_DEFAULT_VALUE,
    CONTENT_TYPE_HEADER,
    DEFAULT_ERROR_CODE,
    DEFAULT_ERROR_MESSAGE
} from "../constants";
import {dispatch, store} from "../../store";
import utils from "../utils";

export const axiosInstance = axios.create({
    timeout: 100000,
    headers: {
        [CONTENT_TYPE_HEADER]: CONTENT_TYPE_DEFAULT_VALUE
    }
});

/**
 * 요청 인터셉터
 * 요청 시 헤더에 인증 관련 토큰을 포함한다.
 */
axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = utils.token.getAccessToken();
        if (accessToken) config.headers[AUTHORIZATION_HEADER] = accessToken;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

/**
 * 응답 인터셉터
 * 인증 만료 응답 시 서버로 리프레시 토큰을 담고 재인증 요청을 한다.
 * 재인증 요청 성공 시 기존 요청을 다시 재시도한다.
 */
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const {code = DEFAULT_ERROR_CODE} = error.response.headers;
        if (code === AUTHENTICATION_EXPIRED_ERROR_CODE) {
            const originalConfig = error.config;
            await dispatch(store.auth.fetch.fetchRefreshLogin());
            return axiosInstance(originalConfig);
        } else {
            const {code = DEFAULT_ERROR_CODE, message = DEFAULT_ERROR_MESSAGE} = error.response.headers;
            const decodedMessage = decodeURI(message).replace(/\+/g, " ");
            alert(`[${code}] ${decodedMessage}`);
        }

        return Promise.reject(error);
    }
)