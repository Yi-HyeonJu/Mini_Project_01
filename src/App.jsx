import './App.css'
import listData from './data/movieListData.json';
import MovieCard from './components/MovieCard/MovieCard'
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';

function App() {

  return (
    <Routes>
      <Route path='/' element={ <MovieCard Movies={listData.results}/> }/>
      <Route path='details' element={ <MovieDetail /> } />
    </Routes>
  )
}

export default App
