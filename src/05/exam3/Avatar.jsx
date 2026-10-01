import React from "react";
import "./UserInfo.css";

function Avatar(props) {
    return (
        <img
            className="avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

export default Avatar;