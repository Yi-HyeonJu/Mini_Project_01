import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navBar_container'>
      
      <div className='navBar-logo'>
        <img
          className='navBar-logoImg'
          src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
          alt='넷플릭스 로고'
          onClick={() => (window.location.href = "/")}
        />
      </div>

      <div className='navBar-buttons'>
        <Link to={`/login`}>
          <button className='login-button'>로그인</button>
        </Link>
        <Link to={`/signup`}>
          <button className='register-button'>회원가입</button>
        </Link>
      </div>

    </div>
  );
};

export default NavBar;