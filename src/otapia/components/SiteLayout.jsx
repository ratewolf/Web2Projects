import { useContext, useState } from 'react';
import { pageHref } from '../navigation';
import ThemeContext from '../ThemeContext';
import '../styles/components/SiteLayout.css';

const navItems = [
  ['home', '홈'],
  ['dex', '포켓몬 도감'],
  ['worldcup', '이상형 월드컵'],
  ['notice', '공지사항'],
];

export function Brand() {
  return (
    <a className="brand" href={pageHref('home')} aria-label="Pick Poké 홈">
      <span className="brand-mark" aria-hidden="true">P</span>
      <span>Pick<span className="brand-accent">Poké</span></span>
    </a>
  );
}

export function SiteHeader({ page, signedIn, onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  function submitSearch(event) {
    event.preventDefault();
    const search = query.trim();
    if (search) window.location.hash = pageHref('dex', { q: search });
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="main-nav" aria-label="주요 메뉴">
          {navItems.map(([id, label]) => (
            <a key={id} href={pageHref(id)} aria-current={page === id ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
        <form className="header-search" role="search" aria-label="사이트 검색" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="site-search">포켓몬 이름 또는 번호 검색</label>
          <input
            id="site-search"
            type="search"
            placeholder="포켓몬 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
          />
          <button className="icon-button" type="submit" aria-label="검색">
            <span className="search-icon" aria-hidden="true" />
          </button>
        </form>
        <div className="account-nav" aria-label="사용자 메뉴">
          <button
            className="icon-button theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label="다크 모드"
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☼' : '☾'}</span>
          </button>
          {signedIn ? (
            <>
              <span className="trainer-name">체험 트레이너</span>
              <button className="button button-small" type="button" onClick={onLogout}>로그아웃</button>
            </>
          ) : (
            <a className="button button-small" href={pageHref('login')} aria-current={page === 'login' ? 'page' : undefined}>로그인</a>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <p>Otapia를 바탕으로 제작한 1학년 2학기 웹프로그래밍 기말 프로젝트</p>
        <a href={pageHref('notice')}>이용 안내</a>
      </div>
    </footer>
  );
}
