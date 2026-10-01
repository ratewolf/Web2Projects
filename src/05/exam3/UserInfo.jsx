import React from "react";
import Avatar from "./Avatar";

function UserInfo(props) {
    return (
        <div className="userInfo">
            <Avatar user={props.user} />

            <div className="userName">
                {props.user.name}
            </div>
        </div>
    );
}

export default UserInfo;