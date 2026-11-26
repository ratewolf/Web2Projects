import { useEffect, useRef, useState } from 'react';
import { dexLabel, statLabels, statTotal } from '../data/pokedex';
import '../styles/components/PokemonCard.css';

const typeTones = {
  풀: 'green', 물: 'blue', 불꽃: 'orange', 전기: 'yellow', 독: 'purple',
  에스퍼: 'pink', 고스트: 'purple', 비행: 'blue', 얼음: 'blue', 벌레: 'green',
  악: 'gray', 페어리: 'pink', 드래곤: 'purple', 격투: 'orange', 땅: 'brown',
  바위: 'brown', 강철: 'gray', 노말: 'gray',
};

export function PokemonArtwork({ pokemon, className = '', eager = false }) {
  const [failed, setFailed] = useState('');
  if (failed === pokemon.image) {
    return <span className={`art-fallback ${className}`}>{pokemon.nameKo}</span>;
  }
  return (
    <img
      className={className}
      src={`${process.env.PUBLIC_URL}/${pokemon.image}`}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(pokemon.image)}
    />
  );
}

export function TypeTags({ types }) {
  return (
    <ul className="type-tags" aria-label="타입">
      {types.map((type) => <li className={`type-tag tone-${typeTones[type]}`} key={type}>{type}</li>)}
    </ul>
  );
}

export function PokemonCard({ pokemon, action, favorite, onToggleFavorite, onShowDetails, eager }) {
  return (
    <article className="pokemon-card">
      <div className={`pokemon-portrait tone-${typeTones[pokemon.types[0]]}`}>
        <span className="dex-number">{dexLabel(pokemon.dexNumber)}</span>
        <PokemonArtwork pokemon={pokemon} eager={eager} />
        {onToggleFavorite && (
          <button
            className="favorite-button icon-button"
            type="button"
            aria-label={`${pokemon.nameKo} 즐겨찾기`}
            aria-pressed={favorite}
            onClick={onToggleFavorite}
          >
            <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
          </button>
        )}
      </div>
      <div className="pokemon-info">
        <div className="pokemon-title">
          <h3>{pokemon.nameKo}</h3>
          <p>{pokemon.nameEn}</p>
        </div>
        <TypeTags types={pokemon.types} />
        {onShowDetails && (
          <button className="text-button pokemon-detail-button" type="button" onClick={onShowDetails} aria-label={`${pokemon.nameKo} 상세 보기`}>
            상세 보기 <span aria-hidden="true">→</span>
          </button>
        )}
        {action}
      </div>
    </article>
  );
}

export function PokemonDetails({ pokemon, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog className="pokemon-dialog" ref={dialogRef} aria-labelledby="detail-title" onClose={onClose}>
      <div className={`detail-portrait tone-${typeTones[pokemon.types[0]]}`}>
        <button className="icon-button dialog-close" type="button" aria-label="상세 닫기" onClick={() => dialogRef.current.close()}>×</button>
        <PokemonArtwork pokemon={pokemon} eager />
      </div>
      <div className="detail-body">
        <p className="dex-number">{dexLabel(pokemon.dexNumber)} · {pokemon.nameEn}</p>
        <h2 id="detail-title">{pokemon.nameKo}</h2>
        <TypeTags types={pokemon.types} />
        <dl className="detail-facts">
          <div><dt>최초 등장 지방</dt><dd>{pokemon.originRegion} · {pokemon.generation}세대</dd></div>
          <div><dt>최초 등장 작품</dt><dd>{pokemon.debutGames.join(', ')}</dd></div>
        </dl>
        <div className="stats-heading"><h3>종족값</h3><strong>합계 {statTotal(pokemon)}</strong></div>
        <dl className="stats-list">
          {Object.entries(statLabels).map(([stat, label]) => (
            <div key={stat}>
              <dt>{label}</dt>
              <dd>
                <span className="stat-track" aria-hidden="true"><span style={{ width: `${pokemon.baseStats[stat] / 255 * 100}%` }} /></span>
                <span>{pokemon.baseStats[stat]}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </dialog>
  );
}
