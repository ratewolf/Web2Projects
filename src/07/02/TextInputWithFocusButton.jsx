import React, {useRef} from "react";

function TextInputWithFocusButton(props) {
    const inputElemRef = useRef(null);

    const onButtonClick = () => {
        inputElemRef.current.focus();
    };

    return (
        <div>
            <input ref={inputElemRef} type={"text"} size={20}/>&nbsp;&nbsp;&nbsp;
            <button onClick={onButtonClick}>Focus the input element</button>
        </div>
    )
}

export default TextInputWithFocusButton;