import React from "react";

import "./moviesCard.scss";

import { Link, useLocation, useParams } from "react-router-dom";

import Button from "../button/Button";

import { category } from "../../api/request";

const MoviesCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item._id;

  return (
    <>
      <Link to={link}>
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${item.backdrop_path})`}}
        >
          <Button>
            <i className="bx bx-play"></i>
          </Button>
          <h3>{item.title || item.name}</h3>
        </div>
      </Link>
    </>
  );
};

export default MoviesCard;
