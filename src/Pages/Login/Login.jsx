import './Login.css'

// - 이메일 또는 아이디 입력 필드
// - 비밀번호 입력 필드
// - 로그인 버튼

function Login(props) {
  return (
    <div className='login_container'>
      
      <div className='login-logo'>
          <img
            className='login-logoImg'
            src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
            alt='넷플릭스 로고'
          />
          <p className='login-text'>로그인을 환영합니다!</p>
      </div>

      <form>
        <div className='login_infomation_container'>
          
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
          
          <button className='login_button' type='submit'>로그인</button>
        
        </div>
      </form>
      
    </div>
    )
}

export default Login;