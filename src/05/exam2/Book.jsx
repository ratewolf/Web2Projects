import React from "react";
import  "./Book.css";

function Book(props) {
    return(
        <div>
            <div className={"wrapper"}>
                <img
                    className={"image"}
                    src={props.coverImage}
                    alt={`${props.title} book cover`}
                />
            </div>
            <div className={"contentContainer"}>
                <span className={"titleText"}>{props.title}</span>
                <span className={"authorText"}>{props.author}</span>
            </div>
        </div>

    );
}

export default Book;