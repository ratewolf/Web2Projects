import React, { useState } from "react";
import DistanceInput from "./DistanceInput";
import "./DistanceConverter.css"; // CSS 임포트

function DistanceConverter(props) {
    const [distance, setDistance] = useState('');
    const [scale, setScale] = useState("km");

    const handleKiloMeterChange = (distance) => {
        setDistance(distance);
        setScale("km");
    };

    const handleMileChange = (distance) => {
        setDistance(distance);
        setScale("mile");
    };

    const kiloMeter = scale === "mile" ? tryConvert(distance, toKiloMeter) : distance;
    const mile = scale === "km" ? tryConvert(distance, toMile) : distance;

    return (
        <div className="converter-container">
            <DistanceInput
                scale={"km"}
                distance={kiloMeter}
                onDistanceChange={handleKiloMeterChange}
            />
            <DistanceInput
                scale={"mile"}
                distance={mile}
                onDistanceChange={handleMileChange}
            />
        </div>
    );
}

function toKiloMeter(mile) {
    return mile * 1.609;
}

function toMile(kiloMeter) {
    return kiloMeter / 1.609;
}

function tryConvert(distance, convert) {
    const input = parseFloat(distance);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

export default DistanceConverter;