import React, { useState } from "react";
import BoilingVerdict from "./BoilingVerdict";
import tryConvert, { toCelsius, toFahrenheit } from "./tryConvert";
import TemperatureInput from "./TemperatureInput";
import "./Calculator.css";

function Calculator(props) {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState("c");

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale("f");
    };

    const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    // 변환된 섭씨(celsius) 값을 기준으로 상태 판별
    const numericCelsius = parseFloat(celsius);
    const isBoiling = numericCelsius >= 100;
    const isFreezing = numericCelsius <= 0;

    let cardStateClass = "";
    if (isBoiling) cardStateClass = "is-boiling";
    else if (isFreezing) cardStateClass = "is-freezing";

    return (
        <div className={`calculator-container ${cardStateClass}`}>
            <TemperatureInput
                scale={"c"}
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale={"f"}
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />
            <BoilingVerdict celsius={numericCelsius} />
        </div>
    );
}

export default Calculator;