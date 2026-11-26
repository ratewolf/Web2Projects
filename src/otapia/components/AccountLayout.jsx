import { useState } from 'react';
import '../styles/components/AccountLayout.css';

export function AccountLayout({ title, description, className, children }) {
  return (
    <div className={`shell sub-page account-page ${className}`}>
      <header className="page-heading"><h1>{title}</h1><p>{description}</p></header>
      <div className="surface account-panel">{children}</div>
    </div>
  );
}

export function PasswordField({ value, onChange, name = 'password', error, hint, autoComplete = 'current-password' }) {
  const [show, setShow] = useState(false);
  const label = name === 'confirm' ? '비밀번호 확인' : '비밀번호';

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="password-field">
        <input className="field-control" id={name} type={show ? 'text' : 'password'} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} required aria-invalid={Boolean(error)} aria-describedby={error || hint ? `${name}-feedback` : undefined} />
        <button type="button" className="text-button" onClick={() => setShow(!show)} aria-label={`${label} 표시`} aria-pressed={show}>{show ? '숨기기' : '보기'}</button>
      </div>
      {(error || hint) && <p className={error ? 'form-error' : 'field-hint'} id={`${name}-feedback`}>{error || hint}</p>}
    </div>
  );
}
