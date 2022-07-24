import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./episodes.scss";
// import

import { Link, useLocation, useParams } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

import useWindowDimensions from "../../../hooks/useWindowDimensions";
import MoviesList from "../../../components/movies-list/MoviesList";
import {
  deleteCommentUser,
  deleteUser,
  embedEpisode,
  embedMovie,
  getCommentUser,
  getEpisode,
  getList,
  getSeason,
  getSimilar,
  postCommentUser,
} from "../../../api/constants";
import Video from "../../detail/VideoList";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";

const Episodes = () => {
  const { category, id, season, episode } = useParams();
  // Được thừa hưởng từ season, episode trong Link của season và season được thừa hưởng ID ở page detail
  const [detailEpisodes, setDetailEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await getList(category, id, { params });
      setDetailEpisodes(response.data);
    };
    getDetail();
  }, [season, episode]);


  useEffect(() => {
    const getEpisodes = async () => {

      const findIdEpisode = detailEpisodes?.episodes?.find((item) => {
        return item.episode_number === Number(episode) && item.season === Number(season);
      });
      setEpisodes(findIdEpisode);
    };
    getEpisodes();
  }, [season, episode, detailEpisodes]);



  return (
    <>
      <WatchItem
        episodesItem={episodes}
        detailEpisodes={detailEpisodes?.episodes}
      />
      {/* {episodes?.map((item, i) => (
      ))} */}
    </>
  );
};

export const WatchItem = (props) => {
  const [item, setItem] = useState([]);
  const [similar, setSimilar] = useState();
  const [resizeItem, setResizeItem] = useState(false);
  const { height, width } = useWindowDimensions();

  const episodeRef = useRef(null);
  const { category, id, season, episode } = useParams();
  const episodes = props.episodesItem ? props.episodesItem : "";

  const { detailEpisodes, episodesItem } = props;
  const filterEpisode = detailEpisodes?.filter((item) => {
    return item.season === Number(season);
  });

  React.useEffect(() => {
    const getDetail = async () => {
      let response = null;
      response = await getList(category, id, {});
      setItem(response.data);
    };
    getDetail();
  }, [category, id, season, episode]);

  useEffect(() => {
    const getSmilar = async () => {
      const params = {};
      let response = null;
      const genre_id = item?.genre_ids?.find((items) => {
        return items._id === item.genre_ids[0]._id;
      });
      // console.log(genre_id._id)
      response = await getSimilar(category, genre_id?._id, { params });
      setSimilar(response.data.slice(0, 15));
      window.scrollTo(0, 0);
    };
    getSmilar();
  }, [category, id, item]);

  // console.log(episodesItem)

  return (
    <div className="episode banner">
      <div className="h-100"></div>
      <div className="container">
        <div className="episode_left">
          <iframe
            className="iframe"
            width="100%"
            height={"100%"}
            src={
              category === "tv"
                ? embedEpisode(episodes.idTv, season, episode)
                : embedMovie(item.idMovie)
            }
            title="Movie player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          {/* Xem video */}
          {/* <Video item={category === "movie" ? item : episodesItem} type="video" /> */}
          {category === "movie" ? (
            ""
          ) : (
            <div className="episode_left-title">
              {episodes.name} episode {episodes.episode_number} ( Season
              {episodes.season} )
            </div>
          )}
          <div className="episode_left-description">
            {category !== "movie"
              ? episodes.overview
              : `${item.title} (${new Date(
                  item.first_air_date || item.release_date
                ).getFullYear()})`}{" "}
          </div>
          {category !== "movie" && (
            <div className="episode_left-container">
              <span>Episode:</span>
              <div className="episode_left-content">
                {episodes !== undefined
                  ? filterEpisode?.map((item, i) => (
                      <EpisodesItem
                        id={id}
                        key={i}
                        item={item}
                        category={category}
                        episode={episode}
                        season={season}
                      />
                    ))
                  : ""}
              </div>
            </div>
          )}
          <CommentUser item={item} />
        </div>
        <div className="episode_right">
          {width >= 600 ? (
            <div className="episode_right-row" ref={episodeRef}>
              <h2>Similar</h2>
              {resizeItem ? (
                "abc"
              ) : (
                <div className="episode_right-container">
                  {similar !== undefined &&
                    similar.map((item, i) => (
                      <ItemSimilar
                        key={i}
                        id={item.id}
                        category={category}
                        item={item}
                      />
                    ))}
                </div>
              )}
            </div>
          ) : (
            category !== undefined && (
              <MoviesList category={category} type="similar" id={id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const ItemSimilar = (props) => {
  const { id } = useParams();
  const item = props.item;
  const idItem = item._id === id;
  return (
    <>
      {idItem === false && (
        <Link
          to={`/${props.category}/${item?._id}`}
          className="episode_right-link"
        >
          <div className="episode_right-content">
            <div className="episode_right-content-img">
              <img src={`${item?.backdrop_path}`} alt={item?.name} />
              <div className="vote">
                <span>{item?.vote_average}</span>
              </div>
            </div>
            <div className="episode_right-content-title">
              <h4>{item?.name || item?.title}</h4>
              <p>
                {new Date(
                  item?.first_air_date || item?.release_date
                ).getFullYear()}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

const EpisodesItem = (props) => {
  // const [seasons, setSeason] = useState([]);
  const { id } = useParams();
  const linkRef = useRef();
  const { pathname } = useLocation();
  const { item, season, episode } = props;
  let linkItem = `/tv/${id}/watch/season/${season}/episodes/${item.episode_number}`;
  console.log(item);
  return (
    <>
      <Link
        to={`${linkItem}`}
        className={pathname === linkItem ? "active" : ""}
      >
        <div className="episode_left-item" ref={linkRef.item}>
          {item.episode_number}
        </div>
      </Link>
    </>
  );
};

const CommentUser = (props) => {
  const { item } = props;
  const { id, category } = useParams();
  const [comment, setComment] = useState([]);
  const [commentFilter, setCommentFilter] = useState([]);
  const { register, handleSubmit } = useForm({});
  const info = useSelector((state) => state.users.userSignIn);
  const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1);

  useEffect(() => {
    const getCommentUsers = async () => {
      try {
        const res = await getCommentUser();
        setComment(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentUsers();
  }, [id]);

  useEffect(() => {
    const commentFilter = comment.filter((item) => {
      if (category === "tv") {
        return item?.tv?._id === id;
      }
      return item?.movie?._id === id;
    });
    setCommentFilter(commentFilter);
  }, [comment]);

  const onSubmit = async (data, event) => {
    const getIdUser = localStorage.getItem("id");
    const userNamePost = localStorage.getItem("name");
    if (category === "movie") {
      const res = await postCommentUser({
        comment: data.comment,
        user: getIdUser,
        movie: id,
      });
      const setUser = { ...res.data, username: userNamePost };
      setCommentFilter([...commentFilter, setUser]);
      // console.log([...commentFilter, res.data])
    } else {
      const res = await postCommentUser({
        comment: data.comment,
        user: getIdUser,
        tv: id,
      });
      const setUser = { ...res.data, username: userNamePost };
      setCommentFilter([...commentFilter, setUser]);
    }
    event.target.reset();
  };

  return (
    <div className="comment_user">
      <h2>Comment</h2>
      <div className="comment_user_container">
        {info.username !== undefined && (
          <form className="comment_user_form" onSubmit={handleSubmit(onSubmit)}>
            <BiUserCircle className="user" />
            <input
              {...register("comment")}
              type="text"
              className="comment"
              name="comment"
              id="comment"
              placeholder="Comment"
              // onChange={event => setValue(event?.target?.value)}
              // value={value}
            />
            <button type="submit">Post</button>
          </form>
        )}
        <div className="comment_user_content">
          {commentFilter?.map((item) => {
            const handleDeleteComment = async () => {
              const filterCommentUserName = commentFilter.filter((item) => {
                return item?.user?.username === info.username;
              });
              const filterCommentUser = filterCommentUserName.find(
                (itemFilter) => {
                  return itemFilter?.comment === item?.comment;
                }
              );

              const filterCommentUserReset = commentFilter.filter((item) => {
                return item.comment !== filterCommentUser?.comment;
              });
              await deleteCommentUser(filterCommentUser?._id);
              setCommentFilter(filterCommentUserReset);
            };
            return (
              <div className="comment_user_item">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                  alt="image user"
                />
                <div className="comment_user_item_content">
                  <div className="comment_user_item_content_text">
                    <h4>{item?.user?.username || item.username}</h4>
                    <p>{item?.comment}</p>
                  </div>
                  {item?.user?.username === info.username && (
                    <AiTwotoneDelete
                      className="comment_user_item_content_delete"
                      onClick={handleDeleteComment}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Episodes);
