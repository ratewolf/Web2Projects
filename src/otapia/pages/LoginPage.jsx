import { useState } from 'react';
import { AccountLayout, PasswordField } from '../components/AccountLayout';
import { pageHref } from '../navigation';
import '../styles/pages/LoginPage.css';

const demoAccount = { email: 'otapia@example.com', password: '1234' };

export default function LoginPage({ signedIn, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== demoAccount.email || password !== demoAccount.password) {
      setError('이메일과 비밀번호를 확인하거나 체험 계정 채우기를 사용해 주세요.');
      return;
    }
    setPassword('');
    setError('');
    onLogin(remember);
  }

  function fillDemo() {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setError('');
  }

  return (
    <AccountLayout className="login-page" title="로그인" description="체험 계정으로 로그인 화면을 사용해 보세요.">
      {signedIn ? (
        <div className="account-success" role="status">
          <h2>체험 로그인 완료</h2>
          <p>체험 트레이너님, 환영합니다!</p>
          <a className="button button-primary" href={pageHref('home')}>홈으로 이동</a>
        </div>
      ) : (
        <>
          <form className="account-form" onSubmit={submit} noValidate>
            <label className="field">
              <span>이메일</span>
              <input type="email" required value={email} autoComplete="username" onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder="이메일 주소" />
            </label>
            <PasswordField value={password} onChange={(value) => { setPassword(value); setError(''); }} />
            <label className="checkbox-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> 로그인 상태 유지</label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary" type="submit">체험 로그인</button>
            <button className="button" type="button" onClick={fillDemo}>체험 계정 채우기</button>
          </form>
          <p className="account-switch">입력 검증도 체험해 볼까요? <a className="text-button" href={pageHref('register')}>회원가입</a></p>
        </>
      )}
    </AccountLayout>
  );
}
