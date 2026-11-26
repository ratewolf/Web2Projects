import { useState } from 'react';
import { PokemonArtwork } from '../components/PokemonCard';
import { dexLabel, pokedex } from '../data/pokedex';
import { pageHref } from '../navigation';
import '../styles/pages/HomePage.css';

const regionCups = [
  { region: '관동', number: 6, tone: 'peach' },
  { region: '성도', number: 152, tone: 'mint' },
  { region: '호연', number: 258, tone: 'lilac' },
];

export default function HomePage({ signedIn }) {
  const [featured, setFeatured] = useState(() => pokedex.find((entry) => entry.dexNumber === 25));

  function recommendPokemon() {
    const alternatives = pokedex.filter((entry) => entry.dexNumber !== featured.dexNumber);
    setFeatured(alternatives[Math.floor(Math.random() * alternatives.length)]);
  }

  return (
    <div className="shell home-page">
      {signedIn && <p className="welcome-note">체험 트레이너님, 다시 오셨군요!</p>}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="hero-label"><span /> 포켓몬 도감 &amp; 이상형 월드컵</p>
          <h1 id="home-title">당신의 최애<br /><em>포켓몬</em>은?</h1>
          <p>도감에서 마음에 드는 포켓몬을 찾고,<br className="hero-break" /> 이상형 월드컵에서 나만의 최애를 골라 보세요.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={pageHref('worldcup')}>월드컵 시작 <span aria-hidden="true">→</span></a>
            <a className="button button-light" href={pageHref('dex')}>도감 둘러보기</a>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit" aria-hidden="true" />
          <span className="hero-spark spark-large" aria-hidden="true">✦</span>
          <span className="hero-spark spark-small" aria-hidden="true">✧</span>
          <PokemonArtwork key={featured.dexNumber} pokemon={featured} className="hero-pokemon" eager />
          <div className="hero-caption">
            <a href={pageHref('dex', { q: dexLabel(featured.dexNumber) })} aria-live="polite">
              <span className="dex-number">{dexLabel(featured.dexNumber)}</span>
              <strong>{featured.nameKo}</strong>
              <span aria-hidden="true">↗</span>
            </a>
            <button className="text-button random-button" type="button" onClick={recommendPokemon}>
              <span aria-hidden="true">↻</span> 랜덤 추천
            </button>
          </div>
        </div>
      </section>

      <section className="home-recommendations" aria-labelledby="recommended-title">
        <div className="section-heading">
          <div>
            <h2 id="recommended-title">추천 월드컵</h2>
            <p>좋아하는 지방부터 시작해 보세요.</p>
          </div>
          <a className="text-button section-link" href={pageHref('worldcup')}>전체 포켓몬으로 시작 <span aria-hidden="true">→</span></a>
        </div>
        <div className="region-cards">
          {regionCups.map(({ region, number, tone }) => (
            <a className={`region-card region-${tone}`} key={region} href={pageHref('worldcup', { from: 'dex', region, size: '8' })}>
              <div className="region-copy">
                <span>{pokedex.filter((entry) => entry.originRegion === region).length}종의 후보</span>
                <h3>{region} 지방</h3>
                <span className="region-arrow" aria-hidden="true">↗</span>
              </div>
              <PokemonArtwork pokemon={pokedex.find((entry) => entry.dexNumber === number)} eager />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
