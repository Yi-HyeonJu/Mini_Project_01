import './App.css'
import listData from './data/movieListData.json';
import MovieCard from './components/MovieCard/MovieCard'
import { Outlet, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import { useEffect, useState } from 'react';
import tmdbAPI from './api/tmdbAPI';
import NavBar from './components/NavBar/NavBar'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {

  // 기존 파일에 담겨있는 데이터를 관리
  const [movieList, setMovieList] = useState(listData)

  // API를 통해 가져오는 데이터를 관리
  const [movieData, setMovieData] = useState([])

  // 비동기 요청하기 (한번에 하나의 일만)
  // -> 변수에 api 데이터를 모두 담은 후 응답 데이터의 결과를 setMovieData에 담기
  const fetchMovieData = async () => {
    const response = await tmdbAPI.get('/trending/all/week')
    setMovieData(response.data.results)
  }

  // 컴포넌트 실행 시 데이터 가져오기는 함수 실행
  useEffect(() => {
    fetchMovieData()
  }, [])


  const Layout = () => {
    return (
      <>
        <NavBar />

        <Outlet />
      </>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={ <MovieCard movieList={movieList.results} movieData={movieData}/> }/>
        <Route path='/movie/:id' element={ <MovieDetail/> } />
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/login' element={ <Login/> }/>
      </Route>
    </Routes>
  )
}

export default App
