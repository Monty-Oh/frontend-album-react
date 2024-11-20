import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {
    ACCESS_TOKEN_START_WITH_STRING,
    LOCAL_STORAGE_KEY_ACCESS_TOKEN,
    LOCAL_STORAGE_KEY_REFRESH_TOKEN,
    REDUX_AUTH
} from "../common/constants";
import api from "../common/api";

const auth = createSlice({
    name: REDUX_AUTH,
    initialState: {
        isLoggedIn: localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) !== null && localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN) !== null,
    },
    reducers: {
        logout: (state) => {
            console.log("logout")
            state.isLoggedIn = false;
            // state.accessToken = null;
            // state.refreshToken = null;

            // localStorage에서 토큰 제거
            localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.accessToken && action.payload.refreshToken;
                localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, action.payload.accessToken);
                localStorage.setItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN, action.payload.refreshToken);
            });
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

/**
 * 리프레시 토큰을 반환한다.
 */
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
    "auth/login",
    async ({id, password}) => {
        const response = await api.auth.requestLogin(id, password);
        return response.data;
    }
);

/**
 * 인증 만료 시 재인증 요청을 한다.
 */
const fetchRefreshLogin = createAsyncThunk(
    "auth/refresh",
    async () => {

    }
)

export const authSelector = {selectAccessToken, selectRefreshToken};
export const authAction = auth.actions;
export const authFetch = {fetchLogin};
export default auth.reducer;
