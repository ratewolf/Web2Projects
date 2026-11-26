import { useState } from 'react';
import { pageHref } from '../navigation';
import '../styles/pages/NoticePage.css';

const notices = [
  { category: '월드컵', title: '도감 검색 결과로 월드컵 만드는 방법', content: '도감에서 지방, 작품, 타입, 종족값 조건을 선택하세요. 이 조건으로 월드컵 만들기를 누르면 화면에 표시된 포켓몬을 참가 후보로 가져옵니다. 4·8·16강 중 가능한 규모를 선택해 시작할 수 있습니다.', link: 'dex', label: '포켓몬 도감으로' },
  { category: '도감', title: '포켓몬 도감 수록 기준', content: '관동·성도·호연 출신 포켓몬을 지방별 16종씩 수록했습니다. 전국도감 번호를 기준으로 기본 모습 한 건과 해당 모습의 타입, 종족값을 표시합니다.' },
  { category: '서비스', title: '체험 계정과 브라우저 저장 안내', content: '체험 계정으로 로그인 메뉴의 상태 전환을 확인할 수 있습니다. 회원가입 화면에서는 입력 형식을 검증합니다. 즐겨찾기와 테마 선택은 사용 중인 브라우저에 저장됩니다.', link: 'login', label: '체험 계정으로' },
];

const categories = ['전체', ...new Set(notices.map((notice) => notice.category))];

export default function NoticePage() {
  const [category, setCategory] = useState('전체');
  const visible = notices.filter((notice) => category === '전체' || notice.category === category);

  return (
    <div className="shell sub-page notice-page">
      <header className="page-heading">
        <h1>공지사항</h1>
        <p>도감 수록 기준과 월드컵 이용 방법을 확인하세요.</p>
      </header>
      <div className="notice-filters" role="group" aria-label="공지 분류">
        {categories.map((item) => (
          <button className="button button-small" key={item} type="button" onClick={() => setCategory(item)} aria-pressed={item === category}>{item}</button>
        ))}
      </div>
      <div className="notice-list surface">
        {visible.map(({ category, title, content, link, label }) => (
          <details key={title}>
            <summary><span className="notice-category">{category}</span><strong>{title}</strong><span className="disclosure-arrow" aria-hidden="true">⌄</span></summary>
            <div className="notice-content">
              <p>{content}</p>
              {link && <a className="text-button" href={pageHref(link)}>{label} <span aria-hidden="true">→</span></a>}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
