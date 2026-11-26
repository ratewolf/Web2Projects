import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

const navMenus = [
    "점포 안내",
    "쇼핑 정보",
    "신세계 브랜드",
    "아트&컬처",
    "매거진",
    "고객 서비스",
    "ESG 경영"
];

function HeaderBar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="site-header">
            {/* 최상단 언어 및 제휴사 바 */}
            <div className="top-utility-bar">
                <div className="utility-inner">
                    <div className="lang-links">
                        <span className="active">KR</span> · <span>EN</span> · <span>CN</span>
                    </div>
                    <span className="divider">|</span>
                    <a href="#ssg" className="ssg-link" onClick={(e) => e.preventDefault()}>
                        SSG.COM
                    </a>
                </div>
            </div>

            {/* 메인 네비게이션 바 */}
            <div className="main-gnb">
                <div className="gnb-inner">
                    <a href="#home" className="brand-logo" onClick={(e) => e.preventDefault()}>
                        SHINSEGAE
                    </a>

                    <nav className="gnb-nav">
                        <ul>
                            {navMenus.map((menu) => (
                                <li key={menu}>
                                    <a
                                        href={`#${menu}`}
                                        className={menu === "쇼핑 정보" ? "active" : ""}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {menu}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="gnb-actions">
                        {/* 테마 전환 버튼 */}
                        <button
                            type="button"
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            title="테마 변경"
                        >
                            {theme === "light" ? "🌙 다크" : "☀️ 라이트"}
                        </button>
                        <button type="button" className="icon-text-btn">
                            로그인
                        </button>
                        <button type="button" className="icon-btn" aria-label="검색">
                            🔍
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderBar;