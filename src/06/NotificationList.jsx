import React from "react";
import Notification from "./Notification";
import "./NotificationList.css";

const reservedNotifications = [
    {
        id: 1,
        message: "안녕하세요, 여러분. 반갑습니다!"
    },
    {
        id: 2,
        message: "오늘은 10월을 시작하는 날입니다."
    },
    {
        id: 3,
        message: "오늘 기분은 어떠신가요?"
    },
    {
        id: 4,
        message: "만약 우울하시다면 기분 전환을 위해 독서는 어떨까요?"
    },
    {
        id: 5,
        message: "내일은 더 좋은 날이 될거라고 믿어요!"
    },
]

let timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    render() {
        return(
            <div className="notification-list">
                {
                    this.state.notifications.map((notification) => {
                        return <Notification
                            key={notification.id}
                            id={notification.id}
                            message={notification.message}/>
                    })
                }
            </div>
        );
    }

    componentDidMount() {
        const {notifications} = this.state;

        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index])
                this.setState({
                    notifications: notifications
                });
            } else {
                // this.setState({
                //     notifications: []
                // });
                clearInterval(timer);
            }
        },3000);
    }

    componentWillUnmount() {
        if (timer) {
            clearInterval(timer)
        }
    }
}

export default NotificationList;