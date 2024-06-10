import { useParams } from 'react-router-dom';
import './MovieDetail.css'
// import detailData from '../../data/movieDetailData.json';
import { useEffect, useState } from 'react';
import tmdbAPI from '../../api/tmdbAPI';

function MovieDetail() {

  // 기존 파일에 담겨있는 데이터를 관리
  // const [ movieDetail, setMovieDetail ] = useState(detailData)
  
  // API를 통해 가져오는 데이터를 관리
  const [ movieDetail, setMovieDetail ] = useState('')

  // 동적 경로 매칭을 위해 useParams 사용 (url에서 영화 id 가져오기)
  const { id } = useParams()

  // 비동기 요청하기 (한번에 하나의 일만)
  // -> 변수에 api 데이터를 모두 담은 후 응답 데이터의 결과를 setMovieData에 담기
  const fetchMovieDetail = async () => {
    try {
      const response = await tmdbAPI.get(`/movie/${id}`);
      setMovieDetail(response.data);
      
    } catch (error) {
      console.log(error.message);
    }
  };

  // 컴포넌트 실행 시 데이터 가져오기는 함수 실행
  // id가 바뀔 때 마다 재실행
  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  return (
    <section className='detail_container'>
      <img
        className='detail_img_'
        src={`http://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
      />
      
      <div className='detail_movie-details'>
        <div className='detail_movie-info'>
          <span className='detail_movie-title'>{movieDetail.title}</span>
          <span className='detail_movie-vote_average'>{movieDetail.vote_average}</span>
        </div>
        
        {/* <div className='detail_genres'>
        {movieDetail.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div> */}

        {/* 비동기 처리로 인해 데이터가 담기기전 map이 실행이 되어서 movieDetail 데이터가 있을 때 실행되도록 수정 */}
        {movieDetail && (
          <div className='detail_genres'>
            {movieDetail.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        )}

          <p className='detail_overview'>{movieDetail.overview}</p>
      </div>
    </section>
  );
}

export default MovieDetail;