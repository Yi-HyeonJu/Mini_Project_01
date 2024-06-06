import React, { useState } from 'react';
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate()

  // 검색어를 상태로 관리
  const [inputValue, setInputValue] = useState('')

  // input에 입력한 값을 저장하는 함수
  const changeInput = (e) => {
    setInputValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  return (
    <nav className='navBar_container'>
      
        <img
          className='navBar-logoImg'
          src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
          alt='넷플릭스 로고'
          onClick={() => (window.location.href = "/")}
        />

      <input
        type='text'
        className='navBar-input'  
        placeholder='영화를 검색해주세요.'
        value={inputValue}
        onChange={changeInput}
      />

      <div className='navBar-buttons'>
        <Link to={`/login`}>
          <button className='login-button'>로그인</button>
        </Link>
        <Link to={`/signup`}>
          <button className='register-button'>회원가입</button>
        </Link>
      </div>

    </nav>
  );
};

export default NavBar;