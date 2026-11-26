import React, { useState } from "react";

const branches = ["강남점", "본점", "센텀시티", "대구신세계", "대전신세계 Art&Science"];
const categories = ["테마", "쇼핑뉴스", "이벤트/사은행사"];

function AsideNav({
                      selectedBranch,
                      setSelectedBranch,
                      selectedCategory,
                      setSelectedCategory
                  }) {
    const [isBranchOpen, setIsBranchOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);

    return (
        <aside className="aside-nav">
            {/* 지점 선택 드롭다운 박스 */}
            <div className="filter-box">
                <button
                    type="button"
                    className="filter-header-btn"
                    onClick={() => setIsBranchOpen((prev) => !prev)}
                >
                    <span>{selectedBranch}</span>
                    <span className={`arrow ${isBranchOpen ? "up" : "down"}`}>⌄</span>
                </button>
                {isBranchOpen && (
                    <ul className="filter-list dropdown-list">
                        {branches.map((branch) => (
                            <li key={branch}>
                                <button
                                    type="button"
                                    className={selectedBranch === branch ? "active" : ""}
                                    onClick={() => {
                                        setSelectedBranch(branch);
                                        setIsBranchOpen(false);
                                    }}
                                >
                                    {branch}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 구분 아코디언 메뉴 박스 */}
            <div className="filter-box">
                <button
                    type="button"
                    className="filter-header-btn border-bottom"
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                >
                    <span>구분</span>
                    <span className={`arrow ${isCategoryOpen ? "up" : "down"}`}>⌃</span>
                </button>
                {isCategoryOpen && (
                    <ul className="filter-list">
                        {categories.map((category) => (
                            <li key={category}>
                                <button
                                    type="button"
                                    className={selectedCategory === category ? "active" : ""}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    );
}

export default AsideNav;