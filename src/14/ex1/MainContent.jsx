import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";
import imgGaeul from "./imgs/gaeul.jpg";
import imgLeeseo from "./imgs/leeseo.jpg";
import imgLiz from "./imgs/liz.jpg";
import imgRei from "./imgs/rei.jpg";
import imgWonyoung from "./imgs/wonyoung.jpg";
import imgYujin from "./imgs/yujin.jpg";
import "./MainContent.css";

const celebrities = [
    {
        id: 1,
        name: "장원영",
        avatar: imgWonyoung
    },
    {
        id: 2,
        name: "안유진",
        avatar: imgYujin
    },
    {
        id: 3,
        name: "김리즈",
        avatar: imgLiz
    },
    {
        id: 4,
        name: "박레이",
        avatar: imgRei
    },
    {
        id: 5,
        name: "이가을",
        avatar: imgGaeul
    },
    {
        id: 6,
        name: "최이서",
        avatar: imgLeeseo
    }
];

function MainContent() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`main-container ${theme}`}>
            <header className="theme-control">
                <p>
                    현재 테마: <strong>{theme === "light" ? "라이트 모드 ☀️" : "다크 모드 🌙"}</strong>
                </p>
                <button className="theme-btn" onClick={toggleTheme}>
                    {theme === "light" ? "다크 모드로 변경" : "라이트 모드로 변경"}
                </button>
            </header>

            <div className="card-grid">
                {celebrities.map((celebrity) => (
                    <div className="card" key={celebrity.id}>
                        <img
                            className="avatar"
                            src={celebrity.avatar}
                            alt={`${celebrity.name}의 아바타 사진`}
                        />
                        <h2 className="card-title">{celebrity.name}의 사진입니다!</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainContent;