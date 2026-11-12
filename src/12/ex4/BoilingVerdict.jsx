import React from "react";

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return (
            <div className="verdict boiling">
                <span className="verdict-text">🔥 물이 끓습니다.</span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
            </div>
        );
    } else if (props.celsius <= 0) {
        return (
            <div className="verdict freezing">
                <span className="verdict-text">🧊 물이 업니다.</span>
                <span className="ice-crystal">❄</span>
                <span className="ice-crystal">✦</span>
                <span className="ice-crystal">❄</span>
                <span className="ice-crystal">✦</span>
            </div>
        );
    }
    return (
        <div className="verdict not-boiling">
            <span className="verdict-text">💧 물이 끓지 않습니다.</span>
        </div>
    );
}

export default BoilingVerdict;