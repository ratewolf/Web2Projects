import React from "react";
import UserInfo from "./UserInfo";
import "./UserInfo.css";

const users = [
    {
        name: "이주훈",
        avatarUrl: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png",
        comment: "알리바이 확인 중, 2:40 연구실 출입"
    },
    {
        name: "윤지연",
        avatarUrl: "https://cdn.pixabay.com/photo/2025/08/28/11/47/user-9801864_1280.png",
        comment: "핵심 참고인, 사건 당일 마지막 통화"
    },
    {
        name: "서아림",
        avatarUrl: "https://cdn.pixabay.com/photo/2025/08/28/11/47/user-9801872_1280.png",
        comment: "진술 2회 변경, CCTV 사각지대 이동"
    }
];

function UserInfoList() {
    const currentDate = new Date();

    return (
        <div className="userList">
            {users.map((user, index) => {
                return (
                    <div className="userCard" key={index}>
                        <UserInfo user={user} />

                        <div className="comment">
                            {user.comment}
                        </div>

                        <div className="date">
                            {currentDate.toDateString()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UserInfoList;