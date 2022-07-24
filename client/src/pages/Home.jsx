import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/Button";
// import { Link, Outlet } from 'react-router-dom';
// import { OutlineButton } from '../components/button/Button';

import HeroSlide from "../components/hero-slide/HeroSlide";
import MoviesList from "../components/movies-list/MoviesList";

import { category, type } from '../api/request';
const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-10">
          <div className="section_header mb-40">
            <h2 style={{marginBottom: '10px'}}>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.movie} type={type.trending}/>
        </div>

        <div className="section mb-10">
          <div className="section_header mb-40">
            <h2 style={{marginBottom: '10px'}}>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.movie} type={type.vote}/>
        </div>

        <div className="section mb-10">
          <div className="section_header mb-40">
            <h2 style={{marginBottom: '10px'}}>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.tv} type={type.trending}/>
        </div>

        <div className="section mb-10">
          <div className="section_header mb-40">
            <h2 style={{marginBottom: '10px'}}>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.tv} type={type.vote}/>
        </div>
      </div>
    </>
  );
};

export default Home;
