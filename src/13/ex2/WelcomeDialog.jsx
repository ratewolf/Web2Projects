import React from "react";
import Dialog from "./Dialog";

function WelcomeDialog(props) {
    return (
        <div className={"Dialog-container"}>
            <Dialog color={"blue"} title={"안녕하세요"} message={"우리 사이트에 방문하신 것을 환영합니다!"}></Dialog>
            <Dialog color={"red"} title={"감사해요"} message={"우리 사이트는 React 예제를 제공합니다!"}></Dialog>
            <Dialog color={"green"} title={"잘있어요"} message={"우리 사이트는 React 예제를 제공합니다!"}></Dialog>
        </div>
    );
}

export default WelcomeDialog;