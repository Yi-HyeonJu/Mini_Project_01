import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { fireBaseRegister, loginGoogle } from '../../firebase';
import { useState } from 'react';

function Signup() {
  // 이름 값 상태 관리
  const [nameValue, setNameValue] = useState('');

  // 이메일 값 상태 관리
  const [emailValue, setEmailValue] = useState('');

  // 비번 값 상태 관리
  const [passValue, setPassValue] = useState('');

  // 비번 확인 값 상태 관리
  const [rePassValue, setRePassValue] = useState('');

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await fireBaseRegister(nameValue, emailValue, passValue, rePassValue);
      navigate('/');
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const checkLoginGoogle = async () => {
    try {
      await loginGoogle();
      console.log()

      navigate('/');
    } catch (error) {
      console.error("구글 로그인 오류:", error);
    }
  };

  return (
    <section className='signup_container'>
      <div className='signup-logo'>
        <img
          className='signup-logoImg'
          src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
          alt='넷플릭스 로고'
        />
        <p className='signup-text'>회원가입을 환영합니다!</p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <img
          style={{ cursor: "pointer" }}
          src='/signUp.png'
          alt='Google Signup'
          onClick={checkLoginGoogle}
        />
      </div>

      <form onSubmit={register}>
        <div className='infomation_container'>
          <input
            type='text'
            id='name'
            placeholder=' 이름'
            className='name_input'
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
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
          <input
            type='password'
            id='re_password'
            placeholder=' 비밀번호 확인'
            className='re_password_input'
            value={rePassValue}
            onChange={(e) => setRePassValue(e.target.value)}
          />
          <div className='register_buttons'>
            <button
              className='register_button'
              type='submit'
            >
              회원가입
            </button>
            <Link to={'/login'}>
              <button className='register_back_button' type='button'>취소</button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Signup;
