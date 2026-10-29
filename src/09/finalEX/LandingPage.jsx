import React, {useState} from "react";
import Toolbar from "./Toolbar";
import americanoImg from "./americano.png";
import "./LandingPage.css";

function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginClick = () => {
        setIsLoggedIn(true);
    };

    const logoutClick = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Toolbar isLoggedIn={isLoggedIn} loginClick={loginClick} logoutClick={logoutClick}/>
            <div>
                9장 조건부 렌더링 실습 화면 <br/>
                <img src={americanoImg} alt="americano" width={200} />
            </div>
        </div>
    );
}

export default LandingPage;