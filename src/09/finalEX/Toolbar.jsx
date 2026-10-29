import React from "react";

function Toolbar(props) {
    const {isLoggedIn, loginClick, logoutClick} = props;

    return (
        <div>
            {
                isLoggedIn && <span>환영합니다.</span>
            }
            {
                isLoggedIn ? <button onClick={logoutClick}>로그아웃</button> : <button onClick={loginClick}>로그인</button>
            }
        </div>
    );
}

export default Toolbar;