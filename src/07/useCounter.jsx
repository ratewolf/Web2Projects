import React, {useEffect, useState} from "react";

// Custom Hook(사용자 정의 훅)
function useCounter(initialValue, MAX_CAPACITY) {
    const [count, setCount] = useState(initialValue);

    const increaseCount = () => {
        setCount((count) => Math.min(MAX_CAPACITY, count + 1))
    };

    const decreaseCount = () => {
        setCount((count) => Math.max(0, count - 1))
    };

    return [count, increaseCount, decreaseCount];
}

export default useCounter;