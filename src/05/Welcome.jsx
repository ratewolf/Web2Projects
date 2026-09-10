import React from "react";

function Welcome(props) {
    return(
      <h1 className="welcome-item">안녕, {props.name}</h1>
    );
}

export default Welcome;