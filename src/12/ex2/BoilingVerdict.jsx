import React from "react";

function BoilingVerdict(props) {
    const isBoiling = props.celsius >= 100;
    const isFreezing = props.celsius <= 0;

    if (isBoiling) {
        return (
            <div className="verdict boiling">
                <span className="verdict-text">🔥 물이 끓습니다!</span>
                {/* 보글보글 올라오는 기포들 */}
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
            </div>
        );
    }

    if (isFreezing) {
        return (
            <div className="verdict not-boiling">
                <span className="verdict-text">🧊 물이 업니다.</span>
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