import {
    ACCESS_TOKEN_START_WITH_STRING,
    LOCAL_STORAGE_KEY_ACCESS_TOKEN,
    LOCAL_STORAGE_KEY_REFRESH_TOKEN
} from "../constants";

function saveToken(target, token) {
    localStorage.setItem(target, token);
}

function deleteToken(target) {
    localStorage.removeItem(target);
}

export const token = {
    getAccessToken() {
        return localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    },
    getRefreshToken() {
        return localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
    },
    saveAccessToken(token) {
        saveToken(LOCAL_STORAGE_KEY_ACCESS_TOKEN, ACCESS_TOKEN_START_WITH_STRING + token);
    },
    saveRefreshToken(token) {
        saveToken(LOCAL_STORAGE_KEY_REFRESH_TOKEN, token);
    },
    deleteAccessToken() {
        deleteToken(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    },
    deleteRefreshToken() {
        deleteToken(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
    },
};
