import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {
    ACCESS_TOKEN_START_WITH_STRING, HTTP_RESULT_KEY_ACCESS_TOKEN, HTTP_RESULT_KEY_REFRESH_TOKEN,
    LOCAL_STORAGE_KEY_ACCESS_TOKEN,
    LOCAL_STORAGE_KEY_REFRESH_TOKEN,
    REDUX_AUTH
} from "../common/constants";
import api from "../common/api";
import utils from "../common/utils";

const authSlice = createSlice({
    name: REDUX_AUTH,
    initialState: {
        isLoggedIn: utils.token.getAccessToken() !== null && utils.token.getRefreshToken() !== null,
    },
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            utils.token.deleteAccessToken();
            utils.token.deleteRefreshToken();
        }
    },
    extraReducers: (builder) => {
        builder
            //  Login
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true;
            })
        ;
    }
});

//  Selector...
/**
 * 액세스 토큰을 반환한다.
 */
const selectAccessToken = createSelector(
    [state => state.auth.data],
    () => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        return accessToken
            ? ACCESS_TOKEN_START_WITH_STRING + accessToken
            : null;
    }
)

const selectRefreshToken = createSelector(
    [state => state.auth.data],
    () => {
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
        return refreshToken
            ? refreshToken
            : null;
    }
)

//  Fetch...
/**
 * 로그인 요청을 한다.
 */
const fetchLogin = createAsyncThunk(
    "user/login",
    async ({id, password}) => {
        const response = await api.auth.requestLogin(id, password);
        utils.token.saveAccessToken(response.data[HTTP_RESULT_KEY_ACCESS_TOKEN]);
        utils.token.saveRefreshToken(response.data[HTTP_RESULT_KEY_REFRESH_TOKEN]);
        return response.data;
    }
);

/**
 * 인증 만료 시 재인증 요청을 한다.
 * 재인증 요청 후 기존 요청을 다시 시도한다.
 */
const fetchRefreshLogin = createAsyncThunk(
    "auth/refresh",
    async () => {
        const refreshToken = utils.token.getRefreshToken();
        const response = await api.auth.requestRefreshToken(refreshToken);
        utils.token.saveAccessToken(response.data[HTTP_RESULT_KEY_ACCESS_TOKEN]);
        utils.token.saveRefreshToken(response.data[HTTP_RESULT_KEY_REFRESH_TOKEN]);
        return response.data;
    }
)

const selector = {selectAccessToken, selectRefreshToken};
const action = authSlice.actions;
const fetch = {fetchLogin, fetchRefreshLogin};

export const auth = {selector, action, fetch};
export default authSlice.reducer;
