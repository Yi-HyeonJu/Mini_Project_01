import './App.css'
import MovieCard from './components/MovieCard/MovieCard'
import { Outlet, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import { useEffect, useState } from 'react';
import tmdbAPI from './api/tmdbAPI';
import NavBar from './components/NavBar/NavBar'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {

  // API를 통해 가져오는 데이터를 관리 - 트렌드 영화 종류
  const [movieList, setMovieList] = useState([])

  // 비동기 요청하기 (한번에 하나의 일만)
  // -> 변수에 api 데이터를 모두 담은 후 응답 데이터의 결과를 setMovieData에 담기
  const fetchMovieList = async () => {
    try{
      const response = await tmdbAPI.get('/trending/all/week')
      setMovieList(response.data.results)

    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(movieList)

  // API를 통해 가져오는 데이터를 관리 - 유명 영화 종류
  const [movieData, setMovieData] = useState([])

  // 비동기 요청하기 (한번에 하나의 일만)
  // -> 변수에 api 데이터를 모두 담은 후 응답 데이터의 결과를 setMovieData에 담기
  const fetchMovieData = async () => {
    try{
      const response = await tmdbAPI.get('movie/popular')
      setMovieData(response.data.results)

    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(movieData)


  // 컴포넌트 실행 시 데이터 가져오기는 함수 실행
  useEffect(() => {
    fetchMovieList()
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
        <Route index element={ <MovieCard movieData={movieData}/> }/>
        <Route path='/movie/:id' element={ <MovieDetail/> } />
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/login' element={ <Login/> }/>
      </Route>
    </Routes>
  )
}

export default App
