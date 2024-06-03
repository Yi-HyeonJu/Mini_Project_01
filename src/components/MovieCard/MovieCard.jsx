/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './MovieCard.css'

function MovieCard({ Movies }) {

  return (
      <div className="card_container">
          {Movies.map((Movie) => (
            <div className='card_movie-container' key={Movie.id}>
              <Link to="details" style={{ textDecoration: "none"}} >
                <div className='card_movie-img'>
                  <img
                  className='card_movie-img__'
                  alt="영화 이미지"
                  src={`http://image.tmdb.org/t/p/original/${Movie.backdrop_path}`}
                  />
                </div>
                <p className='card_movie-title'>
                  {Movie.title}
                </p>
              </Link>
              <p className='card_movie-vote_average'>
                {Movie.vote_average}
              </p>
            </div>
          ))}
      </div>
  );
}

export default MovieCard;