import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect } from "react";
import { getTypeCast, getTypeGenre, getTypeMovie, getTypeTv } from "../../api/constants";
import { useState } from "react";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
export default function FeaturedInfo() {
  const [countMovie, setCountMovie] = useState(0);
  const [countTv, setCountTv] = useState(0);
  const [countGenre, setCountGenre] = useState(0);
  const [countCast, setCountCast] = useState(0);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await getTypeMovie();
        setCountMovie(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    const getTv = async () => {
      try {
        const res = await getTypeTv();
        setCountTv(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    const getGenre = async () => {
      try {
        const res = await getTypeGenre();
        setCountGenre(res.data.length);
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    };
    const getCast = async () => {
      try {
        const res = await getTypeCast();
        setCountCast(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
    getTv();
    getGenre();
    getCast();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredItem_left">
          <span className="featuredTitle">Movie</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{countMovie}</span>
          </div>
          <span className="featuredSub">Number of movies added</span>
        </div>
        <div className="featuredItem_right">
          <TheatersIcon />
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredItem_left">
          <span className="featuredTitle">Tv series</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{countTv}</span>
          </div>
          <span className="featuredSub">Number of Tv series added</span>
        </div>
        <div className="featuredItem_right">
          <LiveTvIcon />
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredItem_left">
          <span className="featuredTitle">Genre</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{countGenre}</span>
          </div>
          <span className="featuredSub">Number of genre added</span>
        </div>
        <div className="featuredItem_right">
          <CategoryIcon />
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredItem_left">
          <span className="featuredTitle">Cast</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{countCast}</span>
          </div>
          <span className="featuredSub">Number of cast added</span>
        </div>
        <div className="featuredItem_right">
          <SupervisedUserCircleIcon />
        </div>
      </div>
    </div>
  );
}
