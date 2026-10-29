import React, {useState} from "react";
import LogOutButton from "./LogOutButton";
import Greeting from "../ex1/Greeting";
import LogInButton from "./LogInButton";

function LogInControl() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logInClickListener = () => {
        setIsLoggedIn(true);
    }

    const logOutClickListener = () => {
        setIsLoggedIn(false);
    }

    let button;

    if (isLoggedIn){
        button = <LogOutButton onClick={logOutClickListener}/>
    }else {
        button = <LogInButton onClick={logInClickListener}/>
    }

    return(
        <div>
            <Greeting isLoggedIn={isLoggedIn}/>
            {button}
        </div>
    )
}

export default LogInControl;