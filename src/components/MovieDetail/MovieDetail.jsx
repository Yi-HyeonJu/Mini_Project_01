import './MovieDetail.css'
import detailData from '../../data/movieDetailData.json';
import { useState } from 'react';

function MovieDetail() {

  const [ movieDetail, setMovieDetail ] = useState(detailData)
  
  return (
    <div className='detail_container'>
      
      <div className='detail_img'>
        <img
          className='detail_img__'
          src={`http://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
        />
      </div>
      
      <div className='detail_movie-details'>
        <div className='detail_movie-info'>
          <span className='detail_movie-title'>{movieDetail.title}</span>
          <span className='detail_movie-vote_average'>{movieDetail.vote_average}</span>
        </div>
        <div className='detail_genres'>
          {movieDetail.genres.map((movie) => (
            <span key={movie.id}>{movie.name}</span>
        ))}
        </div>
          <p className='detail_overview'>{movieDetail.overview}</p>
      </div>
      
    </div>
  );
}

export default MovieDetail;