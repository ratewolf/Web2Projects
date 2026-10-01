import React from "react";
import "./Notification.css"

// 클래스형 컴포넌트
class Notification extends React.Component {
    // 생성자
    constructor(props) {
        super(props);
    }

    // 렌더러
    render() {
        return(
            <div className="notification">
            <span className="notification-message">
                {this.props.message}
            </span>
            </div>
        );
    }

    componentDidMount() {
        console.log(`${this.props.id}: componentDidMount Called`)
    }

    componentDidUpdate() {
        console.log(`${this.props.id}: componentDidUpdate Called`)
    }

    componentWillUnmount() {
        console.log(`${this.props.id}: componentWillUnmount Called`)
    }
}

export default Notification;