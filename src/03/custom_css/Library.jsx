import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Book from "./Book";
import "./Book.css";

// 원본의 도서명, 페이지 수와 이미지 주소를 유지합니다.
const ORIGINAL_BOOKS = [
    {
        "id": 1,
        "name": "처음 만난 Java",
        "numOfPage": 300,
        "imgUrl": "https://image.aladin.co.kr/product/17119/64/cover500/8966262287_1.jpg"
    },
    {
        "id": 2,
        "name": "난생처음 자바 프로그래밍",
        "numOfPage": 200,
        "imgUrl": "https://image.aladin.co.kr/product/31968/88/cover500/k862834165_1.jpg"
    },
    {
        "id": 3,
        "name": "처음 만난 React",
        "numOfPage": 500,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxmBDHLsQ6a3ccyqNgdNlSEelRYg_O0zV52ZZ-2CgHA&s=10"
    },
    {
        "id": 4,
        "name": "이펙티브 자바",
        "numOfPage": 250,
        "imgUrl": "https://image.aladin.co.kr/product/17119/64/cover500/8966262287_1.jpg"
    },
    {
        "id": 5,
        "name": "Java의 정석",
        "numOfPage": 600,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssom7voJcuPteCxqOqlpbWqJd5ykbJkmAdmM44H-w8w&s=10"
    },
    {
        "id": 6,
        "name": "스프링 부트 4 개발자 되기",
        "numOfPage": 300,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOH0YZNR2HnSLBXi3aHPxvqYiNyZ28e9oFmuShly9aBg&s=10"
    },
    {
        "id": 7,
        "name": "혼자 공부하는 자바",
        "numOfPage": 400,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUq-g2CXyywK3-I--8cRpXUgniYj9SyQi4szNPQ6KpPQ&s=10"
    }
];

function getBookTags(name) {
    const tags = ["프로그래밍"];
    if (/java|자바/i.test(name)) tags.push("Java");
    if (/react/i.test(name)) tags.push("React");
    if (/스프링|spring/i.test(name)) tags.push("Spring Boot");
    return tags;
}

// 연도가 제공되지 않았으므로 null을 사용합니다.
const BOOKS = ORIGINAL_BOOKS.map((book) => ({
    ...book,
    category: "도서",
    year: null,
    tags: getBookTags(book.name),
}));

const SECTIONS = [
    { id: "database", label: "작품/캐릭터", eyebrow: "DATABASE", title: "작품 정보 DB", description: "등록된 작품 정보를 검색어와 조건으로 즉시 필터링하는 작품 목록 화면입니다." },
    { id: "worldcup", label: "이상형 월드컵", eyebrow: "WORLD CUP", title: "나의 최애 도서는?", description: "둘 중 더 읽고 싶은 책을 선택하고, 마지막까지 남는 나만의 한 권을 만나보세요." },
    { id: "statistics", label: "통계", eyebrow: "STATISTICS", title: "작품 통계", description: "등록된 도서의 수와 페이지, 태그별 현황을 한눈에 살펴보세요." },
    { id: "notices", label: "공지사항", eyebrow: "NOTICE", title: "공지사항", description: "Otapia 작품 정보 DB의 이용 방법을 안내합니다." },
];

function normalize(value) {
    return String(value).normalize("NFKC").toLocaleLowerCase("ko-KR").replace(/[\s#]+/g, "");
}

function WorldCup() {
    const [contenders, setContenders] = useState(BOOKS);
    const [winners, setWinners] = useState([]);
    const [round, setRound] = useState(1);
    const [champion, setChampion] = useState(null);

    function restart() {
        setContenders(BOOKS);
        setWinners([]);
        setRound(1);
        setChampion(null);
    }

    function choose(book) {
        const remaining = contenders.slice(2);
        const advancing = [...winners, book];
        // 홀수 번째 마지막 도서는 다음 라운드로 진출합니다.
        if (remaining.length === 1) advancing.push(remaining.pop());
        if (remaining.length > 0) {
            setContenders(remaining);
            setWinners(advancing);
        } else if (advancing.length === 1) {
            setChampion(advancing[0]);
        } else {
            setContenders(advancing);
            setWinners([]);
            setRound((value) => value + 1);
        }
    }

    return (
        <section className="otapia-panel otapia-worldcup" aria-labelledby="worldcup-heading">
            <div className="otapia-section-heading">
                <h2 id="worldcup-heading" aria-live="polite">{champion ? "나의 최애 도서" : `${round}라운드 · 더 읽고 싶은 책은?`}</h2>
                <button type="button" className="otapia-button otapia-button-secondary" onClick={restart}>다시 시작</button>
            </div>
            {champion ? (
                <div className="otapia-champion" role="status">
                    <p>🏆 마지막까지 선택한 한 권</p>
                    <Book {...champion} />
                </div>
            ) : (
                <div className="otapia-match">
                    {contenders.slice(0, 2).map((book) => (
                        <div className="otapia-contender" key={book.id}>
                            <Book {...book} />
                            <button type="button" className="otapia-button otapia-button-primary" onClick={() => choose(book)} aria-label={`${book.name} 선택`}>이 책 선택</button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

function Library({ onLogin, onSignUp } = {}) {
    const fieldId = useId();
    const [activeSection, setActiveSection] = useState("database");
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [year, setYear] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [accountAction, setAccountAction] = useState("로그인");
    const [themeReady, setThemeReady] = useState(false);
    const resultHeading = useRef(null);
    const accountDialog = useRef(null);

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem("otapia-theme");
            setDarkMode(saved === "dark");
        } catch {
            // 저장소가 차단된 경우에도 테마 전환은 동작합니다.
        }
        setThemeReady(true);
    }, []);

    useEffect(() => {
        if (!themeReady) return;
        try {
            window.localStorage.setItem("otapia-theme", darkMode ? "dark" : "light");
        } catch {
            // 저장할 수 없는 환경에서는 현재 세션에만 적용합니다.
        }
    }, [darkMode, themeReady]);

    const categories = useMemo(() => [...new Set(BOOKS.map((book) => book.category))], []);
    const years = useMemo(() => [...new Set(BOOKS.map((book) => book.year).filter((value) => value != null))].sort((a, b) => b - a), []);
    const popularTags = useMemo(() => {
        const counts = new Map();
        BOOKS.forEach((book) => book.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
        return [...counts].sort((a, b) => b[1] - a[1]);
    }, []);
    const visibleBooks = useMemo(() => {
        const search = normalize(query);
        return BOOKS.filter((book) => {
            const searchable = normalize([book.name, book.category, ...book.tags].join(" "));
            return (!search || searchable.includes(search))
                && (!category || book.category === category)
                && (!year || (year === "unknown" ? book.year == null : String(book.year) === year))
                && (!selectedTag || book.tags.includes(selectedTag));
        });
    }, [query, category, year, selectedTag]);

    const section = SECTIONS.find((item) => item.id === activeSection);
    const totalPages = BOOKS.reduce((sum, book) => sum + book.numOfPage, 0);

    function resetFilters() {
        setQuery("");
        setCategory("");
        setYear("");
        setSelectedTag("");
    }

    function chooseTag(tag) {
        setSelectedTag((current) => current === tag ? "" : tag);
        setActiveSection("database");
    }

    function openAccount(action) {
        const handler = action === "로그인" ? onLogin : onSignUp;
        if (typeof handler === "function") {
            handler();
            return;
        }
        setAccountAction(action);
        accountDialog.current?.showModal();
    }

    return (
        <div className={`otapia-app${darkMode ? " otapia-dark" : ""}`}>
            <a className="otapia-skip-link" href={`#${fieldId}-main`}>본문으로 이동</a>
            <header className="otapia-header">
                <div className="otapia-header-inner">
                    <button type="button" className="otapia-brand" aria-label="Otapia 홈" onClick={() => { resetFilters(); setActiveSection("database"); }}>
                        <span className="otapia-brand-seal" aria-hidden="true"><span>Otapia</span></span>
                        <span>Otapia</span>
                    </button>
                    <form className="otapia-global-search" role="search" aria-label="전체 작품 검색" onSubmit={(event) => { event.preventDefault(); setActiveSection("database"); }}>
                        <label className="otapia-sr-only" htmlFor={`${fieldId}-global-search`}>전체 작품 검색</label>
                        <input id={`${fieldId}-global-search`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="작품, 분류, 태그 검색..." />
                        <button className="otapia-button otapia-button-primary" type="submit">검색</button>
                    </form>
                    <div className="otapia-account-actions">
                        <button type="button" className="otapia-button otapia-button-outline" onClick={() => openAccount("회원가입")}>회원가입</button>
                        <button type="button" className="otapia-button otapia-button-outline" onClick={() => openAccount("로그인")}>로그인</button>
                    </div>
                </div>
            </header>
            <nav className="otapia-nav" aria-label="주 메뉴">
                <div className="otapia-nav-inner">
                    {SECTIONS.map((item) => (
                        <button key={item.id} type="button" className={`otapia-nav-item${activeSection === item.id ? " is-active" : ""}`} aria-pressed={activeSection === item.id} onClick={() => setActiveSection(item.id)}>
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="otapia-main" id={`${fieldId}-main`}>
                <section className="otapia-hero" aria-labelledby={`${fieldId}-title`}>
                    <p className="otapia-eyebrow">{section.eyebrow}</p>
                    <h1 id={`${fieldId}-title`}>{section.title}</h1>
                    <p className="otapia-hero-description">{section.description}</p>
                </section>

                {activeSection === "database" && (
                    <div className="otapia-database-layout">
                        <div className="otapia-database-content">
                            <section className="otapia-panel otapia-search-panel" aria-label="작품 검색 및 필터">
                                <form role="search" aria-label="DB 검색" onSubmit={(event) => { event.preventDefault(); resultHeading.current?.focus(); }}>
                                    <label className="otapia-field-label" htmlFor={`${fieldId}-query`}>DB 검색</label>
                                    <input className="otapia-input" id={`${fieldId}-query`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="작품명, 분류, 태그 검색" />
                                    <div className="otapia-filter-row">
                                        <div className="otapia-field">
                                            <label className="otapia-field-label" htmlFor={`${fieldId}-category`}>분류</label>
                                            <select className="otapia-select" id={`${fieldId}-category`} value={category} onChange={(event) => setCategory(event.target.value)}>
                                                <option value="">전체 분류</option>
                                                {categories.map((value) => <option key={value} value={value}>{value}</option>)}
                                            </select>
                                        </div>
                                        <div className="otapia-field">
                                            <label className="otapia-field-label" htmlFor={`${fieldId}-year`}>연도</label>
                                            <select className="otapia-select" id={`${fieldId}-year`} value={year} onChange={(event) => setYear(event.target.value)}>
                                                <option value="">전체 연도</option>
                                                {years.map((value) => <option key={value} value={value}>{value}년</option>)}
                                                {BOOKS.some((book) => book.year == null) && <option value="unknown">연도 미등록</option>}
                                            </select>
                                        </div>
                                        <div className="otapia-filter-actions">
                                            <button type="submit" className="otapia-button otapia-button-primary">검색</button>
                                            <button type="button" className="otapia-button otapia-button-secondary" onClick={resetFilters}>초기화</button>
                                        </div>
                                    </div>
                                    {selectedTag && (
                                        <button type="button" className="otapia-active-filter" onClick={() => setSelectedTag("")} aria-label={`${selectedTag} 태그 필터 해제`}>#{selectedTag} <span aria-hidden="true">×</span></button>
                                    )}
                                </form>
                                <div className="otapia-results-summary">
                                    <h2 ref={resultHeading} tabIndex={-1}>실시간 검색 결과</h2>
                                    <p role="status" aria-live="polite" aria-atomic="true">{visibleBooks.length}개의 작품</p>
                                </div>
                            </section>
                            {visibleBooks.length ? (
                                <div className="otapia-book-grid">
                                    {visibleBooks.map((book) => <Book key={book.id} {...book} onTagClick={chooseTag} />)}
                                </div>
                            ) : (
                                <section className="otapia-panel otapia-empty-state">
                                    <span aria-hidden="true">⌕</span>
                                    <h2>검색 결과가 없습니다</h2>
                                    <p>다른 검색어를 입력하거나 검색 조건을 초기화해 보세요.</p>
                                    <button type="button" className="otapia-button otapia-button-primary" onClick={resetFilters}>전체 작품 보기</button>
                                </section>
                            )}
                        </div>
                        <aside className="otapia-panel otapia-popular-tags" aria-labelledby={`${fieldId}-tags-title`}>
                            <h2 id={`${fieldId}-tags-title`}>인기 태그</h2>
                            <div className="otapia-tag-list">
                                {popularTags.slice(0, 4).map(([tag, count]) => (
                                    <button key={tag} type="button" className={`otapia-tag${selectedTag === tag ? " is-selected" : ""}`} aria-pressed={selectedTag === tag} title={`${count}개의 작품`} onClick={() => chooseTag(tag)}>#{tag}</button>
                                ))}
                            </div>
                        </aside>
                    </div>
                )}

                {activeSection === "worldcup" && <WorldCup />}
                {activeSection === "statistics" && (
                    <section className="otapia-panel otapia-statistics" aria-label="등록 작품 통계">
                        <div className="otapia-stat-grid">
                            <div><span>등록 작품</span><strong>{BOOKS.length}<small>권</small></strong></div>
                            <div><span>총 페이지</span><strong>{totalPages.toLocaleString("ko-KR")}<small>페이지</small></strong></div>
                            <div><span>등록 태그</span><strong>{popularTags.length}<small>개</small></strong></div>
                        </div>
                        <h2>태그별 작품 수</h2>
                        <div className="otapia-stat-bars">
                            {popularTags.map(([tag, count]) => (
                                <div className="otapia-stat-row" key={tag}>
                                    <span>#{tag}</span>
                                    <meter min="0" max={BOOKS.length} value={count} aria-label={`${tag} 작품 수`}>{count}</meter>
                                    <strong>{count}권</strong>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {activeSection === "notices" && (
                    <section className="otapia-panel otapia-notices" aria-labelledby={`${fieldId}-guide-title`}>
                        <span className="otapia-tag">이용 안내</span>
                        <h2 id={`${fieldId}-guide-title`}>작품 정보 DB 이용 방법</h2>
                        <ul>
                            <li>작품명이나 태그를 입력하면 검색 결과가 실시간으로 바뀝니다.</li>
                            <li>분류, 연도, 인기 태그를 함께 선택해 검색 범위를 좁힐 수 있습니다.</li>
                            <li>초기화를 누르면 전체 작품 목록으로 돌아갑니다.</li>
                            <li>연도가 등록되지 않은 작품은 ‘연도 미등록’으로 표시합니다.</li>
                            <li>화면 오른쪽 아래에서 라이트 모드와 다크 모드를 전환할 수 있습니다.</li>
                        </ul>
                    </section>
                )}
            </main>

            <button type="button" className="otapia-theme-toggle" aria-pressed={darkMode} aria-label="다크 모드" onClick={() => setDarkMode((value) => !value)}>
                <span aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
                {darkMode ? "라이트 모드" : "다크 모드"}
            </button>
            <dialog ref={accountDialog} className="otapia-account-dialog" aria-labelledby={`${fieldId}-account-title`}>
                <h2 id={`${fieldId}-account-title`}>{accountAction}</h2>
                <p>회원 기능은 준비 중입니다.<br />작품 검색은 로그인 없이 이용할 수 있어요.</p>
                <form method="dialog"><button className="otapia-button otapia-button-primary" autoFocus>확인</button></form>
            </dialog>
        </div>
    );
}

export default Library;