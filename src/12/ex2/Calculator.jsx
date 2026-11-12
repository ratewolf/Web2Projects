import React, { useState } from "react";
import BoilingVerdict from "./BoilingVerdict";
import "./Calculator.css";

function Calculator(props) {
    const [temperature, setTemperature] = useState('');

    const handleChange = (event) => {
        setTemperature(event.target.value);
    };

    const isBoiling = parseFloat(temperature) >= 100;

    return (
        <fieldset className={isBoiling ? "boiling-card" : ""}>
            <legend>섭씨 온도를 입력하세요: </legend>
            <input
                type="number"
                placeholder="예: 100"
                value={temperature}
                onChange={handleChange}
            />
            <BoilingVerdict celsius={parseFloat(temperature)} />
        </fieldset>
    );
}

export default Calculator;