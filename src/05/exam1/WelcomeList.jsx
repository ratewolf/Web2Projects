import React from "react";
import Welcome from "./Welcome";
import "./WelcomeList.css";

function WelcomeList() {
    return(
        <div className="welcome-list-container">
            <Welcome name={`성길수`}></Welcome>
            <Welcome name={`홍길동`}></Welcome>
            <Welcome name={`김철수`}></Welcome>
        </div>
    );
}

export default WelcomeList;