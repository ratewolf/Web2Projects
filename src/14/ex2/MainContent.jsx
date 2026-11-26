import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";
import imgGaeul from "./imgs/gaeul.jpg";
import imgLeeseo from "./imgs/leeseo.jpg";
import imgLiz from "./imgs/liz.jpg";
import imgRei from "./imgs/rei.jpg";
import imgWonyoung from "./imgs/wonyoung.jpg";
import imgYujin from "./imgs/yujin.jpg";

const shoppingItems = [
    {
        id: 1,
        tag: "SEASON OFF",
        branch: "강남점",
        category: "테마",
        title: "SEASON OFF (장원영 에디션)",
        period: "26.11.12(목) - 26.11.29(일)",
        location: "각 층 본매장",
        bannerText: "SEASON OFF",
        ribbonText: "SEASON OFF",
        image: imgWonyoung
    },
    {
        id: 2,
        tag: "SALE",
        branch: "강남점",
        category: "테마",
        title: "SALE (안유진 컬렉션)",
        period: "26.11.12(목) - 26.11.29(일)",
        location: "각 층 본매장",
        bannerText: "SALE",
        ribbonText: "SALE",
        image: imgYujin
    },
    {
        id: 3,
        tag: "OPEN STAGE",
        branch: "강남점",
        category: "테마",
        title: "윈터 홀리데이 팝업 스토어",
        period: "26.11.20(금) - 26.12.01(화)",
        location: "센트럴 1층 오픈 스테이지&스토어",
        bannerText: "",
        ribbonText: "",
        image: imgLiz
    },
    {
        id: 4,
        tag: "SPECIAL GIFT",
        branch: "강남점",
        category: "쇼핑뉴스",
        title: "겨울 아우터 스페셜 기프트",
        period: "26.11.21(토) - 26.11.30(월)",
        location: "신관 4층 이벤트홀",
        bannerText: "NEW ARRIVAL",
        ribbonText: "",
        image: imgRei
    },
    {
        id: 5,
        tag: "POP-UP",
        branch: "강남점",
        category: "이벤트/사은행사",
        title: "홀리데이 뷰티 갈라",
        period: "26.11.25(수) - 26.12.05(토)",
        location: "본관 1층 더 스테이지",
        bannerText: "BEAUTY GALA",
        ribbonText: "",
        image: imgGaeul
    },
    {
        id: 6,
        tag: "EXHIBITION",
        branch: "강남점",
        category: "테마",
        title: "겨울 시즌 컬렉션 프리뷰",
        period: "26.11.26(목) - 26.12.10(목)",
        location: "본관 3층 아트월",
        bannerText: "",
        ribbonText: "",
        image: imgLeeseo
    }
];

function MainContent({ selectedBranch, selectedCategory, columns, setColumns }) {
    const { theme } = useContext(ThemeContext);

    // 선택된 구분(카테고리)에 따라 필터링 (전체 확인을 원하면 filter 조건 제거 가능)
    const filteredItems = shoppingItems.filter(
        (item) => item.category === selectedCategory || selectedCategory === "테마"
    );

    return (
        <main className={`shopping-main ${theme}`}>
            {/* 정렬방식 컨트롤 바 */}
            <div className="sort-control-bar">
                <span className="sort-label">정렬방식</span>
                <div className="grid-toggle-btns">
                    {/* 3열 보기 버튼 */}
                    <button
                        type="button"
                        className={`grid-btn ${columns === 3 ? "active" : ""}`}
                        onClick={() => setColumns(3)}
                        aria-label="3열 보기"
                        title="3열 보기"
                    >
                        <span className="bars-3">|||</span>
                    </button>
                    {/* 4열 보기 버튼 */}
                    <button
                        type="button"
                        className={`grid-btn ${columns === 4 ? "active" : ""}`}
                        onClick={() => setColumns(4)}
                        aria-label="4열 보기"
                        title="4열 보기"
                    >
                        <span className="bars-4">||||</span>
                    </button>
                </div>
            </div>

            {/* 쇼핑 정보 카드 그리드 */}
            <div className={`shopping-grid cols-${columns}`}>
                {filteredItems.map((item) => (
                    <article className="shopping-card" key={item.id}>
                        <div className="card-thumb-wrap">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="card-thumb-img"
                            />
                            {/* 이미지 중앙 대형 영문 텍스트 오버레이 */}
                            {item.bannerText && (
                                <div className="thumb-overlay-text">{item.bannerText}</div>
                            )}
                            {/* 하단 빨간색 대각선 띠 배너 */}
                            {item.ribbonText && (
                                <div className="thumb-red-ribbon">
                                    <span>
                                        {item.ribbonText} &nbsp;&nbsp; {item.ribbonText} &nbsp;&nbsp; {item.ribbonText}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="card-info">
                            <p className="card-meta">
                                {item.tag} | {selectedBranch}
                            </p>
                            <h2 className="card-heading">{item.title}</h2>
                            <p className="card-period">{item.period}</p>
                            <p className="card-location">{item.location}</p>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default MainContent;