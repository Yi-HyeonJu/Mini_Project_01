import { Link } from 'react-router-dom';
import './Signup.css'

// - 회원가입 페이지 레이아웃을 구성합니다. 회원가입에 필요한 요소는 자유롭게 구성하되, 아래 항목은 필수로 포함합니다:
// - 이름 입력 필드
// - 이메일 입력 필드
// - 비밀번호 입력 필드
// - 비밀번호 확인 입력 필드
// - 회원가입 버튼

function Signup(props) {
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

        <form>
          <div className='infomation_container'>
            
              <input
                type='text'
                id='name'
                placeholder=' 이름'
                className='name_input'
              />
            
              <input
                type='email'
                id='email'
                placeholder=' 이메일'
                className='email_input'
              />
            
              <input
                type='text'
                id='password'
                placeholder=' 비밀번호'
                className='password_input'
              />
            
              <input
                type='text'
                id='re_password'
                placeholder=' 비밀번호 확인'
                className='re_password_input'
              />
              <div className='register_buttons'>
                <button className='register_button' type='submit'>회원가입</button>
                <Link to={'/login'}>
                  <button className='register_back_button'>취소</button>
                </Link>
              </div>

          </div>
        </form>
      
    </section>
  );
}

export default Signup;