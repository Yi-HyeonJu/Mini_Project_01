import React, { useEffect, useState } from 'react';
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth, logout } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const NavBar = () => {
  const navigate = useNavigate();

  // 검색어를 상태로 관리
  const [inputValue, setInputValue] = useState('');

  // input에 입력한 값을 저장하는 함수
  const changeInput = (e) => {
    setInputValue(e.target.value);
    // 검색어가 바뀔 때마다 navigate를 통해 새로운 URL로 이동
    navigate(`/search?q=${e.target.value}`);
  };

  // 유저 상태 관리
  const [user, setUser] = useState(null);

  // 컴포넌트가 마운트될 때 사용자 상태를 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자 정보가 있을 경우
        setUser(user);
      } else {
        // 사용자 정보가 없을 경우 (로그아웃 상태)
        setUser(null);
        localStorage.removeItem('userData');
      }
      console.log('로그인 유저정보:', user);
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutUser = async () => {
    await logout(auth);
    // 로그아웃 시 사용자 정보 초기화
    setUser(null);
    // 홈 페이지로 리다이렉트
    navigate('/');
  };

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
      {user ? (
        <div className='navBar-buttons dropmenu'>
          <div className={`dropdown-menu ${showMenu ? 'show' : ''}`}>
            <span className='dropDown_cart'>관심 목록</span>
            <span className='dropDown_logout' onClick={logoutUser}>로그아웃</span>
          </div>
          <button className='my-info' onClick={toggleMenu}>내 정보</button>
        </div>
      ) : (
        <div className='navBar-buttons'>
          <Link to='/login'>
            <button className='login-button'>로그인</button>
          </Link>
          <Link to='/signup'>
            <button className='register-button'>회원가입</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
