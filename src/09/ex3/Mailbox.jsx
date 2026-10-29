import React from "react";
import "./Mailbox.css";

function Mailbox(props) {
    const unreadMessages = 3;

    return (
        <div className="mailbox-container">
            <h1 className="mailbox-title">안녕하세요!</h1>
            {unreadMessages > 0 &&
                <h2 className="mailbox-alert">
                    현재 <span className="highlight">{unreadMessages}</span>개의 읽지 않은 메시지가 있습니다.
                </h2>
            }
        </div>
    );
}

export default Mailbox;