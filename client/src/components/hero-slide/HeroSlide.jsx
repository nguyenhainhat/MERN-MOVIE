import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'


import {getType, getTypeMovie} from "../../api/constants";

import Button, {OutlineButton} from "../button/Button";
import Modal, {ModalContent} from "../modal/Modal";

import "./heroSlide.scss";

const HeroSlide = () => {

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await getTypeMovie();
        setMovieItems(res.data.slice(0, 5));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => swiper}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({isActive}) => (
              <HeroSlideItem item={item} className={`${isActive ? "active" : ""}`} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))} */}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useNavigate();

  const item = props.item;
  // console.log(item)

  // const setModalActive = async () => {
  //   const modal = document.querySelector(`#modal_${item.id}`);

  //   const videos = await tmdbApi.getVideos(category.movie, item.id);

  //   if (videos.results.length > 0) {
  //     const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
  //     modal.querySelector(".modal_content iframe").setAttribute("src", videoSrc);
  //     console.log(videoSrc);
  //   } else {
  //     modal.querySelector(".modal_content p").innerHTML = "No trailer";
  //   }
  //   modal.classList.toggle("active");
  // };
  return (
    <div
      className={`hero-slide_item ${props.className}`}
      style={{backgroundImage: `url(${item.backdrop_path})`}}>
      <div className="hero-slide_item_content container">
        <div className="hero-slide_item_content_info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history("/tv/" + item._id)}>Watch Now</Button>
            {/* <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton> */}
          </div>
        </div>
        <div className="hero-slide_item_content_poster">
          {/* {movieItems.map((item, i) => ( */}

          <img src={item.backdrop_path} alt={item.title} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

// export const TrailerModal = (props) => {
//   const item = props.item;

//   const iframeRef = useRef(null);

//   const onClose = () => iframeRef.current.setAttribute("src", "");

//   return (
//     <Modal active={false} id={`modal_${item.id}`}>
//       <ModalContent onClose={onClose}>
//         <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
//       </ModalContent>
//     </Modal>
//   );
// };

export default HeroSlide;
