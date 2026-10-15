import React, {useState} from "react";

function ConfirmButton2(props) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    function handleConfirm() {
        setIsConfirmed((prevState) => !prevState);
    };

    return(
        <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed? '확인됨' : '확인하기'}
        </button>
    );
}

export default ConfirmButton2;