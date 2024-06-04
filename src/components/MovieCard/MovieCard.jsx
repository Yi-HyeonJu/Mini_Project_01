/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './MovieCard.css'
import { useState } from 'react';

function MovieCard({ movieData }) {

  // 카드 하나를 클랙했을 때 선택된 카드 상태 관리
  const [movieSelected, setMovieSelected] = useState({})

  const clickCard = (id) => {
    setMovieSelected(id)
  }

  return (
      <div className="card_container">
          {movieData.map((movie) => (
            <div
              className='card_movie-container'
              key={movie.id}
              onClick={() => clickCard(movie.id)}
              >
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none"}} >
                <div className='card_movie-img'>
                  <img
                  className='card_movie-img__'
                  alt="영화 이미지"
                  src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  />
                </div>
                <p className='card_movie-title'>
                  {movie.title}
                </p>
              </Link>
              <p className='card_movie-vote_average'>
                {movie.vote_average}
              </p>
            </div>
          ))}
      </div>
  );
}

export default MovieCard;