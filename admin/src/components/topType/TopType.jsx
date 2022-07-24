import React, { useEffect, useState } from "react";
import {
  getMovieTrending,
  getMovieVote,
  getTvTrending,
  getTvVote,
} from "../../api/constants";
import TableHome from "../TablePagination/TablePagination";
import "./topType.scss";

const TopType = () => {
  const [movieVote, setMovieVote] = useState([]);
  const [movieTreding, setMovieTreding] = useState([]);
  const [tvVote, setTvVote] = useState([]);
  const [tvTreding, setTvTreding] = useState([]);

  useEffect(() => {
    const getTypeList = async () => {
      try {
        const resMovieVote = await getMovieVote();
        setMovieVote(resMovieVote.data);
        const resTvVote = await getTvVote();
        setTvVote(resTvVote.data);
        const resMovieTreding = await getMovieTrending();
        setMovieTreding(resMovieTreding.data);
        const resTvTreding = await getTvTrending();
        setTvTreding(resTvTreding.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTypeList();
  }, []);

  return (
    <div className="topType">
      <div className="topType_container">
        <h2>Top Vote</h2>
        <div className="topType_content">
          <TableHome item={movieVote} type="vote" />
          <TableHome item={tvVote} type="vote" />
        </div>
      </div>
      <div className="topType_container">
        <h2>Top Treding</h2>
        <div className="topType_content">
          <TableHome item={movieTreding} type="trending" />

          <TableHome item={tvTreding} type="trending" />
        </div>
      </div>
    </div>
  );
};

export default TopType;
