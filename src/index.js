import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import TodoListApp from "./01/TodoListApp";
import reportWebVitals from './reportWebVitals';
// import Library from "./03/enhanced_css/Library";
// import "./03/enhanced_css/Book.css"
// import Library from "./03/enhanced_css/Library";
// import "./03/enhanced_css/Book.css"
// import Clock from "./04/Clock";
// import "./04/Clock.css"

// import ConfirmDialogList from "./04/ConfirmDialogList";

// import WelcomeList from "./05/exam1/WelcomeList";

// import UserInfoList from "./05/exam3/UserInfoList";

// import NotificationList from "./06/NotificationList";

// import Counter from "./07/01/Counter";
// import TextInputWithFocusButton from "./07/02/TextInputWithFocusButton";

// import Accommodate from "./07/Accommodate";

// import ToggleFunction from "./08/ToggleFunction";
// import ConfirmButton from "./08/ConfirmButton";
// import ConfirmButton2 from "./08/ConfirmButton2";
// import MessageTelautograph from "./08/exam1/MessageTelautograph"

// import Mailbox from "./09/ex3/Mailbox";
// import LogInControl2 from "./09/ex3/LoginControl2";
// import MainPage from "./09/ex4/MainPage";
// import LandingPage from "./09/finalEX/LandingPage";
// import MapTest from "./10/MapTest"
// import AttendanceCardBook from "./10/AttendanceCardBook";
// import NewForm from "./11/NewForm";
// import FruitSelect from "./11/FruitSelect";
// import Reservation from "./11/Reservation";
// import Calculator from "./12/ex4/Calculator";
// import DistanceConverter from "./12/ex6/DistanceConverter";
import SignUpDialog from "./13/ex3/SignUpDialog";
import ProfileCard from "./13/ex5/ProfileCard"

const root = ReactDOM.createRoot(document.getElementById('root'));

setInterval(() => {
        root.render(
            <React.StrictMode>
                <ProfileCard />
            </React.StrictMode>
        );
    }, 1000
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
