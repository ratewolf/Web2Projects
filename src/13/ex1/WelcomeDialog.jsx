import React from "react";
import FancyBorder from "./FancyBorder";

function WelcomeDialog(props) {
    return (
        <div>
            <FancyBorder color={"blue"}>
                <h1 className={"Dialog-title"}>
                    어서오세요
                </h1>
                <p className={"Dialog-message"}>
                    우리 사이트에 방문하신 것을 환영합니다!
                </p>
            </FancyBorder>
            <FancyBorder color={"red"}>
                <h1 className={"Dialog-title"}>
                    감사해요
                </h1>
                <p className={"Dialog-message"}>
                    우리 사이트는 React 예제를 제공합니다!
                </p>
            </FancyBorder>
        </div>
    );
}

export default WelcomeDialog;