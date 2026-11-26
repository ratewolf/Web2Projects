import React, { useState, useCallback } from "react";
import ThemeContext from "./ThemeContext";
import HeaderBar from "./HeaderBar";
import AsideNav from "./AsideNav";
import MainContent from "./MainContent";
import "./ShoppingPage.css";

function DarkOrLight() {
    const [theme, setTheme] = useState("light");
    const [selectedBranch, setSelectedBranch] = useState("강남점");
    const [selectedCategory, setSelectedCategory] = useState("테마");
    const [columns, setColumns] = useState(3); // 3열 또는 4열 보기 전환 상태

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`page-wrapper ${theme}`}>
                {/* 상단 헤더 영역 */}
                <HeaderBar />

                {/* 브레드크럼 & 페이지 메인 타이틀 */}
                <div className="page-header-section">
                    <div className="breadcrumb">
                        <span>HOME</span> / <strong>쇼핑 정보</strong>
                    </div>
                    <h1 className="page-main-title">쇼핑 정보</h1>
                </div>

                {/* 본문 영역: 좌측 사이드바 + 우측 메인 콘텐츠 */}
                <div className="content-layout">
                    <AsideNav
                        selectedBranch={selectedBranch}
                        setSelectedBranch={setSelectedBranch}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    <MainContent
                        selectedBranch={selectedBranch}
                        selectedCategory={selectedCategory}
                        columns={columns}
                        setColumns={setColumns}
                    />
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default DarkOrLight;