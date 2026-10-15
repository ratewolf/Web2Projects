import React, {useEffect, useState} from "react";

function MessageTelautograph(props) {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value)
    };

    function btnClick() {
        alert(message);
        setMessage('');
    };

    return (
        <div>
            <h1>메시지 전송기</h1>
            <input type="text" placeholder="메시지를 입력하세요" value={message} onChange={handleChange}/>
            <button onClick={btnClick}>전송</button>
            <p>미리보기: {message}</p>
        </div>
    );
}

export default MessageTelautograph;