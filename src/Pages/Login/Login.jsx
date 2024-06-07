import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { loginGoogle, loginEmail } from '../../firebase';
import { useState } from 'react';

function Login() {
  // 이동하기위해 사용
  const navigate = useNavigate();

  // 이메일 값 상태 관리
  const [emailValue, setEmailValue] = useState('');

  // 비번 값 상태 관리
  const [passValue, setPassValue] = useState('');

  // firebase 파일의 구글 로그인 로직 사용
  // loginGoogle함수 실행이 끝나길 기다린 뒤 오류가 없다면
  // 반환되는 이블린 값인 true가 success에 담김
  // 값이 true면 메인으로 이동
  const checkLoginGoogle = async () => {
    const success = await loginGoogle();
    if (success) {
      navigate('/');
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await loginEmail(emailValue, passValue);
      navigate("/"); // 로그인 성공 시 navigate 함수를 사용하여 리다이렉트
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <section className='login_container'>
      <div className='login-logo'>
        <img
          className='login-logoImg'
          src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
          alt='넷플릭스 로고'
        />
        <p className='login-text'>로그인을 환영합니다!</p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <img
          style={{ cursor: "pointer" }}
          src='/signUp.png'
          alt='Google Signup'
          onClick={checkLoginGoogle}
        />
      </div>

      <form onSubmit={login}>
        <div className='login_infomation_container'>
          <input
            type='email'
            id='email'
            placeholder=' 이메일'
            className='email_input'
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <input
            type='password'
            id='password'
            placeholder=' 비밀번호'
            className='password_input'
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
          />
          <div className='login_buttons'>
            <button className='login_button' type='submit'>로그인</button>
            <Link to={'/'}>
              <button className='back_button' type='button'>취소</button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
