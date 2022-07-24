import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import tmdbApi from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";

import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";

// import "../../detail/detail.scss";
import "../../../components/hero-slide/heroSlide.scss";

const PageEpisodes = () => {
  const [seasonItem, setSeasonItem] = useState([]);
  const [item, setItem] = useState([]);
  const episodes = seasonItem.episodes;
  const {category, id, season} = useParams();

  useEffect(() => {
    const getSeason = async () => {
      let response = await tmdbApi.season(id, season);
      setSeasonItem(response);
    };
    getSeason();
  }, []);

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await tmdbApi.detail(category, id, {params});
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  console.log(item);

  return (
    <>
      {item !== undefined ? (
        <div
          className="pageEpisodes hero-slide-item"
          style={{
            backgroundImage: `url(${apiConfig.originalImage(
              item.backdrop_path || item.poster_path
            )})`,
          }}>
          <div className="pageEpisodes-container">
            <div className="pageEpisodes-season">
              <img src={`${apiConfig.w200Image(seasonItem.poster_path)}`} alt={seasonItem.name} />
              <div className="season-info">
                <h2>{seasonItem.name}</h2>
                <p>
                  {seasonItem.air_date} | {item.number_of_episodes} Episodes
                </p>
              </div>
            </div>
            <div className="pageEpisodes-item">
              {episodes !== undefined ? (
                <Swiper
                  grabCursor={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  navigation={true}
                  modules={[Navigation]}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}>
                  {episodes.map((item, i) =>
                    item.still_path !== null ? (
                      <SwiperSlide key={i}>
                        {({isActive}) => (
                          <Link
                            to={`episodes/${item.episode_number}`}
                            className={`${isActive ? "active" : ""}`}>
                            <div className="season-episodes_item">
                              <img
                                src={`${apiConfig.w300Image(item.still_path)}`}
                                alt={item.name}
                              />
                              <div className="season-info">
                                {item.name === `Episode ${item.episode_number}` ? (
                                  <h4>{item.name}</h4>
                                ) : (
                                  <>
                                    <h4>{item.name}</h4>
                                    <p>Episode {item.episode_number}</p>
                                  </>
                                )}
                                <p>{item.air_date}</p>
                              </div>
                            </div>
                          </Link>
                        )}
                      </SwiperSlide>
                    ) : (
                      ""
                    )
                  )}
                </Swiper>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PageEpisodes;
