import './MovieDetail.css'
import detailData from '../../data/movieDetailData.json';

function MovieDetail() {

  const movies = detailData
  
  return (
    <div className='detail_container'>
      
      <div className='detail_img'>
        <img
          className='detail_img__'
          src={`http://image.tmdb.org/t/p/original/${movies.poster_path}`}
        />
      </div>
      
      <div className='detail_movie-details'>
        <div className='detail_movie-info'>
          <span className='detail_movie-title'>{movies.title}</span>
          <span className='detail_movie-vote_average'>{movies.vote_average}</span>
        </div>
        <div className='detail_genres'>
          {movies.genres.map((movie) => (
            <span key={movie.id}>{movie.name}</span>
        ))}
        </div>
          <p className='detail_overview'>{movies.overview}</p>
      </div>
      
    </div>
  );
}

export default MovieDetail;