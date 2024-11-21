import {configureStore} from '@reduxjs/toolkit'
import authReducer, {auth} from './auth';
import contentReducer, {content} from './content';

const storeConfig =  configureStore({
    reducer: {
        auth: authReducer,
        content: contentReducer
    }
});

export default storeConfig;
export const {dispatch} = storeConfig;

export const store = {
    content,
    auth,
}
