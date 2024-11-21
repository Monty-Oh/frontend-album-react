import {axiosInstance} from "./axios";
import {AUTH_REFRESH_TOKEN, USER_LOGIN_URL} from "./urls";
import {REFRESH_TOKEN_HEADER} from "../constants";

/**
 * 로그인 요청
 */
const requestLogin = async (loginId, password) => {
    return await axiosInstance.post(USER_LOGIN_URL, { loginId, password });
};

/**
 * 액세스 토큰 갱신 요청
 */
const requestRefreshToken = async (refreshToken) => {
    return await axiosInstance.put(AUTH_REFRESH_TOKEN, {}, {
        headers: {
            [REFRESH_TOKEN_HEADER]: refreshToken
        }
    });
}

export const auth = {requestLogin, requestRefreshToken};