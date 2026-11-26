import { useEffect, useRef, useState } from 'react';
import { PokemonArtwork, PokemonCard } from '../components/PokemonCard';
import { dexLabel } from '../data/pokedex';
import '../styles/pages/WorldCupPage.css';

const tournamentSizes = [4, 8, 16];

function shuffledSelection(candidates, size) {
  const shuffled = candidates.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled.slice(0, size);
}

function begin(initial) {
  return { initial, round: { players: initial, winners: [], index: 0 }, history: [] };
}

function nextMatch({ players, winners, index }, player) {
  const advancing = [...winners, player];
  if (index + 1 === players.length / 2) {
    return { players: advancing, winners: [], index: 0 };
  }
  return { players, winners: advancing, index: index + 1 };
}

function CupSettings({ candidates, preferredSize, dexHref, isFiltered, onStart }) {
  const [selectedSize, setSelectedSize] = useState(Number(preferredSize) || 8);
  const available = tournamentSizes.filter((size) => size <= candidates.length);
  const size = available.includes(selectedSize) ? selectedSize : available.at(-1);

  return (
    <>
      <section className="surface cup-settings" aria-labelledby="cup-settings-title">
        <div className="panel-heading">
          <div>
            <h2 id="cup-settings-title">대진 설정</h2>
            <p>{isFiltered ? '도감에서 고른 조건' : '전체 도감'} · 후보 {candidates.length}종</p>
          </div>
          <a className="text-button" href={dexHref}>{isFiltered ? '조건 다시 설정' : '도감에서 후보 고르기'} <span aria-hidden="true">↗</span></a>
        </div>

        <fieldset className="size-group">
          <legend>참가 규모</legend>
          <div className="size-options">
            {tournamentSizes.map((option) => (
              <label className="size-option" key={option}>
                <input type="radio" name="cup-size" value={option} checked={option === size} disabled={option > candidates.length} onChange={() => setSelectedSize(option)} />
                <span><strong>{option}강</strong><span>{option - 1}경기</span></span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="cup-settings-actions">
          <p>{size ? `후보 중 서로 다른 ${size}종을 무작위로 뽑습니다.` : '월드컵을 시작하려면 후보가 4종 이상 필요해요.'}</p>
          <button className="button button-primary" type="button" disabled={!size} onClick={() => onStart(shuffledSelection(candidates, size))}>
            {size ? `${size}강 시작` : '월드컵 시작'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="cup-preview" aria-labelledby="cup-preview-title">
        <h2 id="cup-preview-title">참가 후보 <span>{candidates.length}종</span></h2>
        {candidates.length ? (
          <ul className="candidate-preview">
            {candidates.map((pokemon) => (
              <li key={pokemon.dexNumber}>
                <PokemonArtwork pokemon={pokemon} />
                <span><span className="dex-number">{dexLabel(pokemon.dexNumber)}</span><strong>{pokemon.nameKo}</strong></span>
              </li>
            ))}
          </ul>
        ) : <p className="muted">도감에서 검색 조건을 바꿔 후보를 추가해 주세요.</p>}
      </section>
    </>
  );
}

function CupTournament({ tournament, onChoose, onUndo, onRestart, onExit }) {
  const { round, initial, history } = tournament;
  const winner = round.players.length === 1 ? round.players[0] : null;
  const pairs = round.players.slice(round.index * 2, round.index * 2 + 2);
  const total = initial.length - 1;
  const title = useRef(null);

  useEffect(() => {
    title.current.focus();
  }, [history.length]);

  return (
    <section className="surface match-stage" aria-labelledby="match-title">
      <div className="match-heading">
        <h2 id="match-title" ref={title} tabIndex={-1}>
          {winner ? '우승 포켓몬' : round.players.length === 2 ? '결승' : `${round.players.length}강 · ${round.index + 1}/${round.players.length / 2}경기`}
        </h2>
        <span>{history.length} / {total} 선택</span>
      </div>
      <progress className="match-progress" aria-label="월드컵 진행률" value={history.length} max={total} />
      {winner ? (
        <div className="winner-card">
          <PokemonCard pokemon={winner} eager />
        </div>
      ) : (
        <div className="pair-grid">
          {pairs.map((pokemon) => (
            <PokemonCard
              key={pokemon.dexNumber}
              pokemon={pokemon}
              eager
              action={<button className="button button-primary choose-button" type="button" onClick={() => onChoose(pokemon)}>{pokemon.nameKo} 선택</button>}
            />
          ))}
        </div>
      )}
      <div className="match-actions">
        <button type="button" className="button" onClick={onUndo} disabled={!history.length}><span aria-hidden="true">←</span> 이전 선택</button>
        <button type="button" className="button" onClick={onRestart}>같은 대진으로 재시작</button>
        <button type="button" className="text-button" onClick={onExit}>대진 설정으로</button>
      </div>
    </section>
  );
}

export default function WorldCupPage({ candidates, preferredSize, dexHref, isFiltered }) {
  const [tournament, setTournament] = useState(null);

  function choose(pokemon) {
    setTournament((current) => {
      if (current !== tournament) return current;
      return {
        ...current,
        round: nextMatch(current.round, pokemon),
        history: [...current.history, current.round],
      };
    });
  }

  function undo() {
    setTournament((current) => {
      if (!current.history.length) return current;
      return { ...current, round: current.history.at(-1), history: current.history.slice(0, -1) };
    });
  }

  return (
    <div className="shell sub-page worldcup-page">
      <header className="page-heading">
        <h1>이상형 월드컵</h1>
        <p>두 후보 중 더 마음에 드는 포켓몬을 골라 나만의 우승 포켓몬을 만나세요.</p>
      </header>
      {tournament ? (
        <CupTournament
          tournament={tournament}
          onChoose={choose}
          onUndo={undo}
          onRestart={() => setTournament((current) => begin(current.initial))}
          onExit={() => setTournament(null)}
        />
      ) : (
        <CupSettings
          candidates={candidates}
          preferredSize={preferredSize}
          dexHref={dexHref}
          isFiltered={isFiltered}
          onStart={(initial) => setTournament(begin(initial))}
        />
      )}
    </div>
  );
}
