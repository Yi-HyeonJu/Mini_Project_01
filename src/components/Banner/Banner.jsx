import React, { useEffect, useState } from 'react';
import tmdbAPI from '../../api/tmdbAPI';
import './Banner.css';
import Swiper from 'swiper';
import 'swiper/css';

function Banner() {
  const [upMovieData, setUpMovieData] = useState([]);

  const fetchUpMovieData = async () => {
    try {
      const response = await tmdbAPI.get('movie/upcoming');
      setUpMovieData(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUpMovieData();
  }, []);

  useEffect(() => {
    if (upMovieData.length > 0) {
      const swiper = new Swiper('.mySwiper', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });

      return () => {
        if (swiper) swiper.destroy();
      };
    }
  }, [upMovieData]);

  return (
    <section className='Banner_container swiper mySwiper'>
      <div className='swiper-wrapper'>
        {upMovieData.map((movie) => (
          <div key={movie.id} className='swiper-slide'>
            <img
              src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
      <div className='swiper-button-prev'>{'<'}</div>
      <div className='swiper-button-next'>{'>'}</div>
    </section>
  );
}

export default Banner;
