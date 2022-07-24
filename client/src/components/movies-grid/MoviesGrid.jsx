import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./moviesGrid.scss";

import MoviesCard from "../movies-card/MoviesCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import tmdbApi, { category, movieType, tvType } from "../../api/request";
import { getType, getTypeList } from "../../api/constants";

const MoviesGrid = (props) => {
  const [items, setItems] = useState([]);
  const [itemsSearch, setItemsSearch] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { category } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      response = await getType(category);
      setItems(response.data);
      setItemsSearch(response.data);
    };
    getList();
  }, [props.category]);
  const handleOnChange = (e) => {
    setKeyword(e.target.value);
  };
  const goToSearch = useCallback(() => {
    let searchFilterTitle = null;
    let searchFilterDesc = null;
    if (keyword.length === 0) {
      setItems(itemsSearch);
    } else {
      searchFilterTitle = items?.filter((item) => {
        return item.title.toLowerCase().includes(keyword.toLowerCase());
      });
      searchFilterDesc = items?.filter((item) => {
        return item.overview.toLowerCase().includes(keyword.toLowerCase());
      });

      setItems(
        searchFilterTitle?.length === 0 ? searchFilterDesc : searchFilterTitle
      );
      setTimeout(() => {
        setKeyword("");
      }, 500);
    }
  }, [items, keyword]);

  return (
    <>
      <div className="section mb-50">
        <div className="movie-search">
          <Input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={handleOnChange}
          />
          <Button className="small" onClick={goToSearch}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <div className="movie-grid">
          {items?.length === 0 ? (
            <p>Not found</p>
          ) : (
            items?.map((item, i) => {
              return (
                <MoviesCard
                  item={item.status === "visible" && item}
                  category={props.category}
                  key={i}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

const MovieSearch = (props) => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  const handleOnChange = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={handleOnChange}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MoviesGrid;
