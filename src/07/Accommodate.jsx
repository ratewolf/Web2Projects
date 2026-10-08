import React, { useEffect, useState } from "react";
import useCounter from "./useCounter";
import "./Accommodate.css"; // CSS 파일 import

function Accommodate() {
    const MAX_CAPACITY = 20;

    const [count, increaseCount, decreaseCount] = useCounter(0, MAX_CAPACITY);
    const [isFull, setIsFull] = useState(false);

    useEffect(() => {
        console.log("======= useEffect 확인용 =======");
        console.log("useEffect 실행됨: 컴포넌트가 마운트 될 때, 업데이트 될 때");
        console.log(`isFull: ${isFull}`);
    });

    useEffect(() => {
        setIsFull(count >= MAX_CAPACITY);
        console.log(`Current Count Value: ${count}`);
    }, [count]);

    return (
        <div className="accommodate-container">
            <p>현재 수용인원: <span>{count}</span> / {MAX_CAPACITY}</p>
            <div className="button-group">
                <button
                    className="btn btn-enter"
                    onClick={increaseCount}
                    disabled={isFull}
                >
                    수용시설에 입장
                </button>
                <button
                    className="btn btn-leave"
                    onClick={decreaseCount}
                    disabled={count === 0}
                >
                    수용시설에서 퇴장
                </button>
            </div>
            {isFull && <p className="full-warning">수용시설에 정원이 가득 찼습니다.</p>}
        </div>
    );
}

export default Accommodate;