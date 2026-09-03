import React from "react";

function Book(props) {
    return(
        <div className={`book-card`}>
            <img src={props.imgUrl} alt={props.name} className="book-cover"/>
            <h1>{`${props.name}`}</h1>
            <h2>{`${props.numOfPage} 페이지`}</h2>
        </div>
    );
}

export default Book;