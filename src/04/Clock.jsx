import React, { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    return (
        <div className="clock">
            <time
                className="clock__time"
                dateTime={time}
                aria-label={`현재 시각은 ${hours}시 ${minutes}분 ${seconds}입니다.`}
            >
                {time}
            </time>
        </div>
    );
}

export default Clock;