import React from "react";
import "./Card.css";

function Card(props) {
    const colorClass = props.color ? ` Card-${props.color}` : "";

    return (
        <a href={"#"} className={`Card${colorClass}`}>
            <div className="Card-img-wrapper">
                <img src={props.imgsrc} alt="숙소 이미지" />
                <span className="Card-badge">오직 에어비앤비에서</span>
                <span className="Card-heart">♡</span>
            </div>
            {props.children}
        </a>
    );
}

export default Card;