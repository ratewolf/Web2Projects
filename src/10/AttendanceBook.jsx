import React from "react";
import "./AttendanceBook.css"; // CSS 파일 import

const students = [
    { id: 1, name: "Inje" },
    { id: 2, name: "Steve" },
    { id: 3, name: "Bill" },
    { id: 4, name: "Jeff" },
];

function AttendanceBook() {
    return (
        <div className="attendance-container">
            <h2 className="attendance-title">📋 출석부</h2>
            <ul className="attendance-list">
                {students.map((student) => (
                    <li key={student.id} className="attendance-item">
                        <span className="attendance-avatar">{student.name[0]}</span>
                        {student.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AttendanceBook;