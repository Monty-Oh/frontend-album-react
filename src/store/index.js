import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth';
import contentReducer from './content';

export default configureStore({
    reducer: {
        auth: authReducer,
        content: contentReducer
    }
});