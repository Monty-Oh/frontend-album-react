import {configureStore} from '@reduxjs/toolkit'
import authReducer, {authAction, authFetch} from './auth';
import contentReducer, {contentAction, contentFetch, contentSelector} from './content';

export default configureStore({
    reducer: {
        auth: authReducer,
        content: contentReducer
    }
});

//  Content
export {
    contentSelector,
    contentFetch,
    contentAction
}

//  Auth
export {
    authAction,
    authFetch
}


//  Store 의 Actions 함수가 필요할 때
// setupAxiosResponseInterceptors(store.dispatch);