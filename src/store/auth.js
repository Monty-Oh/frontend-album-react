import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LOCAL_STORAGE_KEY_ACCESS_TOKEN, LOCAL_STORAGE_KEY_REFRESH_TOKEN, REDUX_AUTH} from "../common/constants";
import {requestLogin} from "../common/api/auth";

const auth = createSlice({
    name: REDUX_AUTH,
    initialState: {
        isLoggedIn: localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) && localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN),
        accessToken: localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) || null,
        refreshToken: localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN) || null
    },
    reducers: {
        logout: (state) => {
            console.log("logout")
            state.isLoggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;

            // localStorage에서 토큰 제거
            localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = state.accessToken && state.refreshToken;
                localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, state.accessToken);
                localStorage.setItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN, state.refreshToken);
            });
    }
});

//  Fetch...
/**
 * 로그인 요청을 한다.
 */
const fetchLogin = createAsyncThunk(
    "auth/login",
    async ({id, password}) => {
        const response = await requestLogin(id, password);
        return response.data;
    }
);

export const authAction = auth.actions;
export const authFetch = {fetchLogin};
export default auth.reducer;
