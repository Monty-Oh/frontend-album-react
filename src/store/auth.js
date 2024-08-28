import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {requestLogin} from "../common/axios";
import {LOCAL_STORAGE_KEY_ACCESS_TOKEN, LOCAL_STORAGE_KEY_REFRESH_TOKEN, REDUX_AUTH} from "../common/constants";

//  RequestLogin
export const fetchLogin = createAsyncThunk(
    "auth/login",
    async ({id, password}) => {
        const response = await requestLogin(id, password);
        return response.data;
    }
);

const auth = createSlice({
    name: REDUX_AUTH,
    initialState: {
        isLoggedIn: localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) && localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN),
        accessToken: localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) || null,
        refreshToken: localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN) || null
    },
    reducers: {},
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

export default auth.reducer;
