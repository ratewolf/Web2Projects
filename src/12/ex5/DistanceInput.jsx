import React from "react";

const scaleNames = {
    km: '킬로미터',
    mile: '마일'
};

function DistanceInput(props) {
    const handleChange = (event) => {
        props.onDistanceChange(event.target.value);
    };

    return (
        <div>
            <fieldset>
                <legend>거리를 입력해 주세요 (단위: {scaleNames[props.scale]})</legend>
                <input
                    type="number"
                    placeholder="거리 입력"
                    value={props.distance}
                    onChange={handleChange}
                />
            </fieldset>
        </div>
    );
}

export default DistanceInput;