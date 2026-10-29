import React, {useState} from "react";
import LogOutButton from "../ex2/LogOutButton";
import Greeting from "../ex1/Greeting";
import LogInButton from "../ex2/LogInButton";

function LogInControl2() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logInClickListener = () => {
        setIsLoggedIn(true);
    }

    const logOutClickListener = () => {
        setIsLoggedIn(false);
    }

    let button = isLoggedIn ? <LogOutButton onClick={logOutClickListener}/> : <LogInButton onClick={logInClickListener}/>

    return(
        <div>
            <Greeting isLoggedIn={isLoggedIn}/>
            {button}
        </div>
    )
}

export default LogInControl2;