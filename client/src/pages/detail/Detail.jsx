import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

// import CastList from "./CastList";
// import VideoList from "./VideoList";
// import MoviesList from "../../components/movies-list/MoviesList";

import { useNavigate, useParams } from "react-router-dom";

// import tmdbApi, {category as cate, movieType} from "../../api/tmdbApi";
// import apiConfig from "../../api/apiConfig";

import "./detail.scss";
// import Season from "./Season";
import Button, { OutlineButton } from "../../components/button/Button";
import { TrailerModal } from "../../components/hero-slide/HeroSlide";
import { getList } from "../../api/constants";
import CastList from "./CastList";
import Season from "./Season";
import MoviesList from "../../components/movies-list/MoviesList";
import { useDispatch, useSelector } from "react-redux";
import { detailItemAdd } from "../../features/detail/detailSlice";
import Video from "./VideoList";

const Detail = () => {
  const [item, setItem] = useState(null);

  let history = useNavigate();
  const dispatch = useDispatch();

  const detailItem = useSelector((state) => state.details.detailItemss);
  const signIn = useSelector((state) => state.users.signIn);
  // const viewer = useSelector((state) => state.users.viewer)
  const { category, id } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await getList(category, id, { params });
      setItem(response.data);
      if (signIn === false) {
        dispatch(detailItemAdd(response.data));
      }
    };
    getDetail();
  }, [category, id]);

  // useEffect(() => {
    // neu view user thi khong luu vao store
    if (signIn === false && detailItem.length > 0 && item !== null) {
      localStorage.setItem("detailItem", JSON.stringify(detailItem));
      localStorage.setItem("type", JSON.stringify(category));
    }
  // }, [item]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.backdrop_path || item.poster_path})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content_poster">
              <div
                className="movie-content_poster_img"
                style={{
                  backgroundImage: `url(${
                    item.backdrop_path || item.poster_path
                  })`,
                }}
              ></div>
            </div>
            <div className="movie-content_info">
              <div className="title">{item.title || item.name}</div>
              <div className="genres">
                {item.genre_ids &&
                  item.genre_ids.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres_item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="vote">
                {item.vote_average} / 10 <i class="bx bxs-star"></i> (
                {item.vote_count} vote)
              </div>
              <div className="btns">
                <Button
                  onClick={() => {
                    category === "tv"
                      ? history("watch/season/1/episodes/1")
                      : history("watch");
                  }}
                >
                  Watch Now
                </Button>
                {/* <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton> */}
              </div>
              <div className="cast">
                <div className="section_header">
                  <CastList item={item.cast} />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <Video item={item} type="trailer" />
            {category === "tv" ? (
              <div className="section mb-3">
                <h2 className="mb-1">
                  Current Season: {item.seasons.length} seasons{" "}
                </h2>
                <Season id={item.id} item={item} />
              </div>
            ) : (
              ""
            )}
            {/* <div className="section mb-3 videoList">
              <VideoList id={item.id} />
            </div> */}
            <div className="section mb-10 mt-20">
              <div className="section_header mb-2">
                <h2>Similar</h2>
                <MoviesList
                  category={category}
                  id={id}
                  type="similar"
                  item={item}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
