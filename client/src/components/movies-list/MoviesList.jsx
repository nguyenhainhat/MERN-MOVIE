import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./moviesList.scss";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

import { getSimilar, getTypeList } from "../../api/constants";

import MoviesCard from "../movies-card/MoviesCard";

const MoviesList = (props) => {
  const [items, setItems] = useState([]);
  const movieItem = props.item;
  useEffect(() => {
    const getList = async () => {
      const params = {};
      let response = null;
      if (props.type !== "similar") {
        response = await getTypeList(props.category, props.type, { params });
      } else {
        const genre_ids = movieItem.genre_ids[0]._id;
        response = await getSimilar(props.category, genre_ids, { params });
      }
      setItems(response.data);
    };
    getList();
  }, []);
  const itemsFilter = items?.filter((item) => {
    return item._id !== props.id && item.status === "visible";
  })
  console.log(items)
  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={4}
        pagination={true}
      >
        {itemsFilter?.map((item, i) => (
          <SwiperSlide key={i}>
            <MoviesCard item={item} key={i} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MoviesList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MoviesList;
