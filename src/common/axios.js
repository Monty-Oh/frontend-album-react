import axios from "axios";
import {DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE} from "./constants";
import {USER_LOGIN_URL} from "./urls";

//  로그인 요청
const requestLogin = function (loginId, password) {
    return axios
        .post(
            USER_LOGIN_URL,
            {loginId, password}
        )
        .catch(errorHandler);
}

const errorHandler = function (error) {
    const {code = DEFAULT_ERROR_CODE, message = DEFAULT_ERROR_MESSAGE} = error.response.headers;
    const decodedMessage = decodeURI(message).replace(/\+/g, " ");
    alert(`[${code}] ${decodedMessage}`);
}

export {
    requestLogin,
}