import {axiosInstance} from "./axios";
import {USER_LOGIN_URL} from "./urls";

/**
 * 로그인 요청
 */
const requestLogin = async (loginId, password) => {
    return await axiosInstance.post(USER_LOGIN_URL, { loginId, password });
};

export const auth = {requestLogin};