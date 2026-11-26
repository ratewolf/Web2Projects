import { useEffect, useRef, useState } from 'react';
import './styles/base.css';
import './styles/controls.css';
import { SiteFooter, SiteHeader } from './components/SiteLayout';
import { filterParams, filterPokemon, pokedex, readFilters } from './data/pokedex';
import { pageHref, readRoute } from './navigation';
import DexPage from './pages/DexPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoticePage from './pages/NoticePage';
import RegisterPage from './pages/RegisterPage';
import WorldCupPage from './pages/WorldCupPage';
import ThemeContext from './ThemeContext';

const themeKey = 'pick-poke:theme';
const favoritesKey = 'pick-poke:favorites';
const sessionKey = 'pick-poke:demo-session';

const pageTitles = {
  home: '홈', dex: '포켓몬 도감', worldcup: '이상형 월드컵', notice: '공지사항', login: '로그인', register: '회원가입',
};

function readStorage(storage, key, fallback) {
  try {
    const value = window[storage].getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function writeStorage(storage, key, value) {
  try {
    if (value === null) window[storage].removeItem(key);
    else window[storage].setItem(key, JSON.stringify(value));
  } catch {
    // The current React state can still be used when browser storage is unavailable.
  }
}

function App() {
  const [location, setLocation] = useState(() => window.location.hash);
  const [theme, setTheme] = useState(() => readStorage('localStorage', themeKey, 'light') === 'dark' ? 'dark' : 'light');
  const [favorites, setFavorites] = useState(() => {
    const saved = readStorage('localStorage', favoritesKey, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [signedIn, setSignedIn] = useState(() => (
    readStorage('localStorage', sessionKey, false) === true || readStorage('sessionStorage', sessionKey, false) === true
  ));
  const { page, params } = readRoute(location);
  const previousPage = useRef(page);
  const main = useRef(null);

  useEffect(() => {
    const sync = () => setLocation(window.location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[page]} · Pick Poké`;
    if (previousPage.current !== page) {
      document.documentElement.scrollTop = 0;
      main.current.focus({ preventScroll: true });
      previousPage.current = page;
    }
  }, [page]);

  useEffect(() => {
    writeStorage('localStorage', themeKey, theme);
  }, [theme]);

  useEffect(() => {
    writeStorage('localStorage', favoritesKey, favorites);
  }, [favorites]);

  function setFilters(nextFilters) {
    const href = pageHref('dex', filterParams(nextFilters));
    window.history.replaceState(window.history.state, '', href);
    setLocation(href);
  }

  function toggleFavorite(number) {
    setFavorites((current) => current.includes(number) ? current.filter((item) => item !== number) : [...current, number]);
  }

  function signIn(remember) {
    writeStorage('localStorage', sessionKey, remember ? true : null);
    writeStorage('sessionStorage', sessionKey, remember ? null : true);
    setSignedIn(true);
  }

  function signOut() {
    writeStorage('localStorage', sessionKey, null);
    writeStorage('sessionStorage', sessionKey, null);
    setSignedIn(false);
  }

  const filters = readFilters(params);
  const isFiltered = params.get('from') === 'dex';
  let content;

  switch (page) {
    case 'dex':
      content = <DexPage filters={filters} candidates={filterPokemon(filters, favorites)} favorites={favorites} onFilters={setFilters} onToggleFavorite={toggleFavorite} />;
      break;
    case 'worldcup':
      content = <WorldCupPage key={location} candidates={isFiltered ? filterPokemon(filters, favorites) : pokedex} preferredSize={params.get('size')} dexHref={pageHref('dex', filterParams(filters))} isFiltered={isFiltered} />;
      break;
    case 'notice':
      content = <NoticePage />;
      break;
    case 'login':
      content = <LoginPage signedIn={signedIn} onLogin={signIn} />;
      break;
    case 'register':
      content = <RegisterPage />;
      break;
    default:
      content = <HomePage signedIn={signedIn} />;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark') }}>
      <div className="site" data-theme={theme}>
        <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); main.current.focus(); }}>본문 바로가기</a>
        <SiteHeader page={page} signedIn={signedIn} onLogout={signOut} />
        <main id="main-content" ref={main} tabIndex={-1}>{content}</main>
        <SiteFooter />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
