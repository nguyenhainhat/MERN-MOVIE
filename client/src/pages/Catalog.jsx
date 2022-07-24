import React from "react";

import {useParams, Outlet} from "react-router-dom";

import PageHeader from "../components/page-header/PageHeader";

import {category as cate} from "../api/request";
import MoviesGrid from "../components/movies-grid/MoviesGrid";

const Catalog = () => {
  const {category} = useParams();

  return (
    <>
      <PageHeader>{category === cate.movie ? "Movies" : "TV Series"}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MoviesGrid category={category} />
        </div>
        {/* <Outlet /> */}
      </div>
    </>
  );
};

export default Catalog;
