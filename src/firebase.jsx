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
const fireBase = initializeApp(firebaseConfig);

export const auth = getAuth(fireBase);

const provider = new GoogleAuthProvider();

// 유효성 검사 함수
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Google 로그인
export const loginGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    return true;
  } catch (error) {
    console.error('Google login failed', error);
    return false;
  }
};

// 기존 이메일 로그인
export const loginEmail = async (email, password) => {
  if (!validateEmail(email)) {
    alert('유효한 이메일 주소를 입력해주세요.');
    return false;
  }

  try {
    const loginInfo = await signInWithEmailAndPassword(auth, email, password);
    console.log('기존 유저 회원가입 정보:', loginInfo.user);
    return loginInfo.user;
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        alert('등록되지 않은 이메일입니다.');
        break;
      case 'auth/wrong-password':
        alert('비밀번호가 틀렸습니다.');
        break;
      default:
        alert('로그인 실패');
        break;
    }
    throw error;
  }
};

// 신규 이메일 회원가입 로직
export const fireBaseRegister = async (name, email, password, re_password) => {
  if (!name || !email || !password || !re_password) {
    alert('빈 칸 없이 모두 작성해주세요.');
    return false;
  }

  if (!validateEmail(email)) {
    alert('유효한 이메일 주소를 입력해주세요.');
    return false;
  }

  if (password !== re_password) {
    alert('비밀번호가 일치하지 않습니다.');
    return false;
  }

  try {
    const registerInfo = await createUserWithEmailAndPassword(auth, email, password);
    console.log('신규 회원가입 정보:', registerInfo.user);
    return registerInfo.user;
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        alert('이메일을 바르게 입력해주세요.');
        break;
      case 'auth/weak-password':
        alert('비밀번호는 6자리 이상으로 해주세요.');
        break;
      case 'auth/email-already-in-use':
        alert('이미 등록된 이메일입니다.');
        break;
      default:
        alert('회원가입에 실패하였습니다.');
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
  } catch (error) {
    console.error('로그아웃 실패', error);
    throw error;
  }
};
