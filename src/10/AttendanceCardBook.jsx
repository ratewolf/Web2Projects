import React from "react";
import img1 from "./imgs/1.jpg";
import "./AttendanceCardBook.css"; // CSS 파일 import

const students = [
    {
        id: 1,
        name: "장원영",
        grade: 1,
        major: "인공지능소프트웨어",
        avatar: img1
    },
    {
        id: 2,
        name: "안유진",
        grade: 2,
        major: "인공지능소프트웨어",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: 3,
        name: "김리즈",
        grade: 1,
        major: "메카트로닉스",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
        id: 4,
        name: "박레이",
        grade: 2,
        major: "스마트정보통신",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
        id: 5,
        name: "이가을",
        grade: 2,
        major: "시각디자인",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
        id: 6,
        name: "최이서",
        grade: 1,
        major: "메타버스콘텐츠",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg"
    }
];

function AttendanceCardBook() {
    return (
        <div className="attendance-container">
            <h2 className="attendance-title">학생 출석부</h2>
            <div className="attendance-grid">
                {students.map((student) => (
                    <div key={student.id} className="attendance-card">
                        <img
                            src={student.avatar}
                            alt={`${student.name} 학생의 아바타 사진`}
                            className="avatar-img"
                        />
                        <div className="student-info">
                            <h3 className="student-name">{student.name}</h3>
                            <p className="student-detail">
                                학년: {student.grade} | 전공: {student.major}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AttendanceCardBook;