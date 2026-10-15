import React, {useEffect, useState} from "react";

function MyButton2() {

    const [count, setCount] = useState(1);

    const btnClick = (id, event) => {
        console.log(id,  event.target, event.x, event.y);
    }

    return (
        <button onClick={(event) => {
            setCount((count) => count + 1);
            btnClick(count, event);
        }}>
            버튼을 클릭하세요. (개발자 도구(F12) 실행)
        </button>
    );
}

export default MyButton2;