import React, { useState } from "react";
import "./Reservation.css";

function Reservation(props) {
    const [haveBreakfast, setHaveBreakfast] = useState(true);
    const [numberOfGuest, setNumberOfGuest] = useState(1);

    const handleSubmit = (event) => {
        alert(`아침식사 여부: ${haveBreakfast}, 방문객 수: ${numberOfGuest}`);
        event.preventDefault();
    }

    return (
        <div className="reservation-container">
            <form onSubmit={handleSubmit} className="reservation-form">
                <h2 className="reservation-title">예약 정보 입력</h2>

                {/* 체크박스 영역 */}
                <label className="reservation-label checkbox-label">
                    <span>아침식사 여부</span>
                    <input
                        type="checkbox"
                        checked={haveBreakfast}
                        onChange={(event) => { setHaveBreakfast(event.target.checked); }}
                        className="reservation-checkbox"
                    />
                </label>

                {/* 숫자 입력 영역 */}
                <label className="reservation-label">
                    <span>방문객 수</span>
                    <input
                        type="number"
                        min="1"
                        value={numberOfGuest}
                        onChange={(event) => { setNumberOfGuest(event.target.value); }}
                        className="reservation-input"
                    />
                </label>

                <button type="submit" className="reservation-submit-btn">제출</button>
            </form>
        </div>
    );
}

export default Reservation;