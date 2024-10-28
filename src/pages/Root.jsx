import Login from "pages/login/Login";
import Main from "pages/main/Main";
import React from "react";
import {useSelector} from "react-redux";

function Root() {
    //  로그인 유무에 따라 달라지는 페이지 렌더링
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return (
        <div>
            {isLoggedIn ? <Main/> : <Login/>}
        </div>
    );
}

export default Root;