import { useState } from 'react';
import { AccountLayout, PasswordField } from '../components/AccountLayout';
import { pageHref } from '../navigation';
import '../styles/pages/RegisterPage.css';

const emptyForm = { nickname: '', email: '', password: '', confirm: '', acknowledged: false };

function validateRegistration(form) {
  return {
    nickname: form.nickname.trim().length >= 2 ? '' : '닉네임을 2자 이상 입력해 주세요.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : '이메일 주소 형식을 확인해 주세요.',
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password) ? '' : '영문과 숫자를 포함해 8자 이상 입력해 주세요.',
    confirm: form.confirm && form.password === form.confirm ? '' : '비밀번호 확인이 일치해야 합니다.',
    acknowledged: form.acknowledged ? '' : '체험 안내 확인에 체크해 주세요.',
  };
}

export default function RegisterPage() {
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  const errors = validateRegistration(form);

  function change(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function fieldError(field) {
    return submitted || touched[field] ? errors[field] : '';
  }

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    setForm(emptyForm);
    setComplete(true);
  }

  return (
    <AccountLayout className="register-page" title="회원가입" description="아래 양식에서 회원가입 입력 검증을 체험할 수 있어요.">
      {complete ? (
        <div className="account-success" role="status">
          <h2>입력 검증 완료</h2>
          <p>체험 로그인 화면에서 로그인 동작도 확인해 보세요.</p>
          <a className="button button-primary" href={pageHref('login')}>체험 로그인으로 이동</a>
        </div>
      ) : (
        <form className="account-form" noValidate onSubmit={submit}>
          {[['nickname', '닉네임', 'text'], ['email', '이메일', 'email']].map(([name, label, type]) => (
            <div className="field" key={name}>
              <label htmlFor={name}>{label}</label>
              <input id={name} required type={type} autoComplete={name} value={form[name]} onChange={(event) => change(name, event.target.value)} aria-invalid={Boolean(fieldError(name))} aria-describedby={fieldError(name) ? `${name}-error` : undefined} />
              {fieldError(name) && <span className="form-error" id={`${name}-error`}>{fieldError(name)}</span>}
            </div>
          ))}
          <PasswordField value={form.password} onChange={(value) => change('password', value)} error={fieldError('password')} hint="영문과 숫자를 포함한 8자 이상" autoComplete="new-password" />
          <PasswordField name="confirm" value={form.confirm} onChange={(value) => change('confirm', value)} error={fieldError('confirm')} autoComplete="new-password" />
          <label className="checkbox-label"><input type="checkbox" checked={form.acknowledged} onChange={(event) => change('acknowledged', event.target.checked)} aria-describedby={fieldError('acknowledged') ? 'acknowledged-error' : undefined} /> 입력 검증 체험 안내를 확인했습니다.</label>
          {fieldError('acknowledged') && <p className="form-error" role="alert" id="acknowledged-error">{fieldError('acknowledged')}</p>}
          <button className="button button-primary" type="submit">입력 검증하기</button>
          <p className="account-switch">체험 계정을 이용하려면 <a className="text-button" href={pageHref('login')}>로그인</a></p>
        </form>
      )}
    </AccountLayout>
  );
}
