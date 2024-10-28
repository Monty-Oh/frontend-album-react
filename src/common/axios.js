import axios from "axios";
import {DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE} from "common/constants";
import {USER_LOGIN_URL} from "common/urls";

/**
 * 로그인 요청
 *
 * @param loginId   로그인 ID
 * @param password 입력된 비밀번호
 */
const requestLogin = function (loginId, password) {
    return axios
        .post(
            USER_LOGIN_URL,
            {loginId, password}
        )
        .catch(errorHandler);
}

/**
 * 공통 에러 핸들러
 * @param error 에러
 */
const errorHandler = function (error) {
    const {code = DEFAULT_ERROR_CODE, message = DEFAULT_ERROR_MESSAGE} = error.response.headers;
    const decodedMessage = decodeURI(message).replace(/\+/g, " ");
    alert(`[${code}] ${decodedMessage}`);
}

export {
    requestLogin,
}