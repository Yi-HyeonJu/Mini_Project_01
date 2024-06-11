// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, // authentication 설정
  signInWithPopup, // google 로그인을 팝업창에 띄우기 위해
  GoogleAuthProvider, // google login 기능
  signInWithEmailAndPassword, // 기존 email 로그인
  createUserWithEmailAndPassword, // 신규 email 회원가입
  signOut // 로그아웃
} from 'firebase/auth';

const firebaseKey = import.meta.env.VITE_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "miniproject-react.firebaseapp.com",
  projectId: "miniproject-react",
  storageBucket: "miniproject-react",
  messagingSenderId: "138540969898",
  appId: "1:138540969898:web:eafd18e2ed72d9019405d3"
};

// Initialize Firebase
// 앱 초기 설정
const fireBase = initializeApp(firebaseConfig);

// 앱에 대한 Auth 인스턴스를 반환
// 인스턴스를 통해 firebase의 서비스와 상호작용하는 데
// 필요한 기능과 메서드를 제공하는 객체
export const auth = getAuth(fireBase);

const provider = new GoogleAuthProvider();

// 유효성 검사 함수
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 유효한지 테스트 후 boolean 값을 리턴
  return emailRegex.test(email);
};

// Google 로그인
export const loginGoogle = async () => {
  try {
    const googleInfo = await signInWithPopup(auth, provider);
    console.log('구글 로그인 정보:', googleInfo.user)
    
    // 사용자 정보를 로컬스토리지에 저장
    localStorage.setItem('userData', JSON.stringify(googleInfo.user));
  } catch (error) {
    console.error('Google login failed', error);
  }
};

// 기존 이메일 로그인
export const loginEmail = async (email, password) => {
  // 1. 이메일 유효성 검사
  if (!validateEmail(email)) {
    alert('유효한 이메일 주소를 입력해주세요.');
  }

  // 2. Firebase 인증 시도
  try {
    const loginInfo = await signInWithEmailAndPassword(auth, email, password);
    console.log('기존 유저 회원가입 정보:', loginInfo.user);
    
    // 사용자 정보를 로컬스토리지에 저장
    localStorage.setItem('userData', JSON.stringify(loginInfo.user));

    return loginInfo.user;
  } catch (error) {
    // 3. 인증 실패 시 오류 처리
    // Firebase에서 제공하는 오류 코드 사용
    switch (error.code) {
      case 'auth/user-not-found':
        alert('등록되지 않은 이메일 입니다.');
        break;
      case 'auth/missing-password':
        alert('비밀번호를 입력해주세요.');
        break;
      case 'auth/wrong-password':
        alert('입력한 비밀번호가 올바르지 않습니다.');
        break;
      case 'auth/too-many-requests':
        alert('로그인 요청이 많습니다. 잠시후 다시 시도해주세요')
    }
    throw error; // 오류를 다시 던져서 호출자에게 전달
  }
};

// 신규 이메일 회원가입 로직
export const fireBaseRegister = async (name, email, password, re_password) => {
  if (!name || !email || !password || !re_password) {
    alert('빈 칸 없이 모두 작성해주세요.');
  } else if (!validateEmail(email)) {
    alert('유효한 이메일 주소를 입력해주세요.');
  } else if (password !== re_password) {
    alert('비밀번호가 일치하지 않습니다.');
  }

  try {
    const registerInfo = await createUserWithEmailAndPassword(auth, email, password);
    console.log('신규 회원가입 정보:', registerInfo.user);
    
    // 사용자 정보를 로컬스토리지에 저장
    localStorage.setItem('userData', JSON.stringify(registerInfo.user));
    return registerInfo.user;
  } catch (error) {
    switch (error.code) {
      // case 'auth/invalid-email':
      //   alert('이메일 주소의 형식이 유효하지 않습니다.');
      //   break;
      case 'auth/email-already-in-use':
        alert('입력한 이메일 주소가 이미 사용 중입니다.');
        break;
      case 'auth/weak-password':
        alert('비밀번호는 6자리 이상으로 해주세요.');
        break;
    }
    throw error;
  }
};

// 사용자 로그아웃
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('로그아웃 성공');

    // 로컬스토리지에서 사용자 정보 삭제
    localStorage.removeItem('userData');
  } catch (error) {
    console.error('로그아웃 실패', error);
    throw error;
  }
};
