import React, { useState } from "react";
import "./FruitSelect.css"; // CSS 파일 불러오기

function FruitSelect(props) {
    const [value, setValue] = useState('apple');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('선택한 과일: ' + value);
        event.preventDefault();
    }

    return (
        <div className="fruit-select-container">
            <form onSubmit={handleSubmit} className="fruit-form">
                <label className="fruit-label">
                    <span>과일을 선택하세요</span>
                    <select value={value} onChange={handleChange} className="fruit-select">
                        <option value="apple">🍎 사과</option>
                        <option value="banana">🍌 바나나</option>
                        <option value="grapes">🍇 포도</option>
                        <option value="melon">🍈 참외</option>
                    </select>
                </label>
                <button type="submit" className="fruit-submit-btn">제출</button>
            </form>
        </div>
    );
}

export default FruitSelect;