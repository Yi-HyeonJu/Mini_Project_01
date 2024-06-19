import React, { useEffect, useState } from "react";
import tmdbAPI from "../../api/tmdbAPI";
import "./Banner.css";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

function Banner() {
  const [upMovieData, setUpMovieData] = useState([]);

  const fetchUpMovieData = async () => {
    try {
      const response = await tmdbAPI.get("movie/upcoming");
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
      // Swiper 초기화
      const swiper = new Swiper(".mySwiper", {
        freeMode: true, // 슬라이더를 움직이는 세기에따라 많이 넘어감
        slidesPerView: 4, // 한번에 보여지는 숫자
        spaceBetween: -100, // 페이지와 페이지 사이의 간격
        centeredSlides: true, // 선택된 슬라이드를 중심으로 할지
        loof: true, // 반복 기능
        //자동 스크를링
        autoplay: {
          //시간 1000 이 1초
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: "coverflow", // 페이지 전환 효과
        // 페이지 전환효과의 상세 설정
        coverflowEffect: {
          rotate: 20,
          stretch: -30,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        },
        // 페이지 네이게이션
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 페이징 바 기능
        pagination: {
          el: ".swiper-pagination",
          clickable: true, // 클릭 가능
        },
      });

      return () => {
        if (swiper) swiper.destroy();
      };
    }
  }, [upMovieData]);

  return (
    <section className="Banner_container mySwiper">
      <div className="swiper-wrapper">
        {upMovieData.map((movie) => (
          <div key={movie.id} className="swiper-slide">
            <div className="slide-content">
              <img
                src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </section>
  );
}

export default Banner;
