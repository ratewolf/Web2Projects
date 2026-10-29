import React, { useState } from "react";
import WarningBanner from "./WarningBanner";
import "./MainPage.css"; // 작성한 CSS 파일 불러오기

function MainPage(props) {
    const [showWarning, setShowWarning] = useState(false);

    const btnListener = () => {
        setShowWarning(prevShowWarning => !prevShowWarning);
    };

    return (
        <div className="main-container">
            <WarningBanner warning={showWarning} />
            <button className="toggle-btn" onClick={btnListener}>
                {showWarning ? "감추기" : "보이기"}
            </button>
        </div>
    );
}

export default MainPage;