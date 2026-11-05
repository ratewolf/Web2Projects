import React from "react";

function MapTest(props) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>)

    return (
        <div>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default MapTest;