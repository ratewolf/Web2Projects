import { useRef, useState } from 'react';
import { PokemonCard, PokemonDetails } from '../components/PokemonCard';
import { filterParams, games, rangeError, regions, types } from '../data/pokedex';
import { pageHref } from '../navigation';
import '../styles/pages/DexPage.css';

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">전체</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export default function DexPage({ filters, candidates, favorites, onFilters, onToggleFavorite }) {
  const [selected, setSelected] = useState(null);
  const searchRef = useRef(null);
  const resultRef = useRef(null);
  const error = rangeError(filters);

  function update(field, value) {
    onFilters({ ...filters, [field]: value });
  }

  function clear() {
    onFilters({});
    searchRef.current.focus();
  }

  return (
    <div className="shell sub-page">
      <header className="page-heading">
        <h1>포켓몬 도감</h1>
        <p>이름이나 등장 조건으로 포켓몬을 찾고, 종족값을 비교해 보세요.</p>
      </header>

      <div className="dex-layout">
        <aside className="surface filters-panel">
          <div className="panel-heading">
            <h2>검색 조건</h2>
            <button className="text-button" type="button" onClick={clear}>초기화</button>
          </div>
          <form role="search" aria-label="도감 검색" onSubmit={(event) => { event.preventDefault(); resultRef.current.focus(); }}>
            <label className="field">
              <span>이름 또는 도감번호</span>
              <input ref={searchRef} type="search" placeholder="피카츄, #025" value={filters.q} onChange={(event) => update('q', event.target.value)} />
            </label>
            <SelectField label="최초 등장 지방" options={regions} value={filters.region} onChange={(value) => update('region', value)} />
            <SelectField label="최초 등장 작품" options={games} value={filters.game} onChange={(value) => update('game', value)} />
            <SelectField label="타입" options={types} value={filters.type} onChange={(value) => update('type', value)} />

            <fieldset className="stat-range">
              <legend>종족값 합계</legend>
              <label className="sr-only" htmlFor="stat-min">종족값 최솟값</label>
              <input className="field-control" id="stat-min" inputMode="numeric" placeholder="최소" value={filters.min} onChange={(event) => update('min', event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? 'range-error' : undefined} />
              <span aria-hidden="true">–</span>
              <label className="sr-only" htmlFor="stat-max">종족값 최댓값</label>
              <input className="field-control" id="stat-max" inputMode="numeric" placeholder="최대" value={filters.max} onChange={(event) => update('max', event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? 'range-error' : undefined} />
              {error && <p className="form-error" id="range-error" role="alert">{error}</p>}
            </fieldset>

            <label className="checkbox-label">
              <input type="checkbox" checked={filters.favorites} onChange={(event) => update('favorites', event.target.checked)} />
              즐겨찾기만 보기
            </label>
          </form>
        </aside>

        <section aria-labelledby="dex-results" className="dex-results">
          <div className="results-bar">
            <h2 id="dex-results" ref={resultRef} tabIndex={-1} aria-live="polite">검색 결과 <strong>{candidates.length}종</strong></h2>
            {candidates.length > 0 ? (
              <a className="button button-primary" href={pageHref('worldcup', { ...filterParams(filters), from: 'dex' })}>
                이 조건으로 월드컵 만들기 <span aria-hidden="true">→</span>
              </a>
            ) : (
              <button className="button button-primary" type="button" disabled>이 조건으로 월드컵 만들기</button>
            )}
          </div>
          {candidates.length > 0 ? (
            <div className="pokemon-grid">
              {candidates.map((pokemon, index) => (
                <PokemonCard
                  key={pokemon.dexNumber}
                  pokemon={pokemon}
                  eager={index < 6}
                  favorite={favorites.includes(pokemon.dexNumber)}
                  onToggleFavorite={() => onToggleFavorite(pokemon.dexNumber)}
                  onShowDetails={() => setSelected(pokemon)}
                />
              ))}
            </div>
          ) : (
            <div className="surface empty-state">
              <h3>{error ? '검색 범위를 확인해 주세요' : '조건에 맞는 포켓몬이 없어요'}</h3>
              <p>{filters.favorites ? '도감에서 포켓몬을 즐겨찾기에 추가하거나 검색 조건을 바꿔 보세요.' : '검색어를 바꾸거나 필터의 범위를 넓혀 보세요.'}</p>
              <button type="button" className="button" onClick={clear}>검색 조건 초기화</button>
            </div>
          )}
        </section>
      </div>
      {selected && <PokemonDetails pokemon={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
