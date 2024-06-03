import './App.css'
import listData from './data/movieListData.json';
import MovieCard from './components/MovieCard/MovieCard'
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import { useState } from 'react';

function App() {

  const [movieList, setMovieList] = useState(listData)

  return (
    <Routes>
      <Route path='/' element={ <MovieCard movieList={movieList.results}/> }/>
      <Route path='details' element={ <MovieDetail /> } />
    </Routes>
  )
}

export default App
