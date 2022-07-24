import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { getTypeMovie, getTypeTv } from "../../../api/constants";
import TableHome from "../../../components/TablePagination/TablePagination";
import "./movie.scss";

function Movie(props) {
  const { category } = useParams();

  const [categoryItem, setCategoryItem] = useState([]);
  const [valueZeroItem, setValueZeroItem] = useState([]);
  const [valueTitle, setValueTitle] = useState("");

  // getTypeTv
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res =
          category === "movie" ? await getTypeMovie() : await getTypeTv();
        setCategoryItem(res.data);
        setValueZeroItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [category]);

  const handleOnChange = (e) => {
    setValueTitle(e.target.value);
  };

  const handleOnClick = useCallback(() => {
    if (valueTitle.length === 0) {
      setCategoryItem(valueZeroItem);
    } else {
      const searchFilterTitle = categoryItem.filter((item) => {
        // console.log(item)
        return item.title
          .toLowerCase()
          .includes(valueTitle.toLowerCase().trim());
      });
      const searchFilterStatus = categoryItem.filter((item) => {
        return item.status
          .toLowerCase()
          .includes(valueTitle.toLowerCase().trim());
      });
     
      setCategoryItem(
        searchFilterTitle.length === 0 ? searchFilterStatus : searchFilterTitle
      );
      setTimeout(() => {
        setValueTitle("");
      }, 500);
    }
  }, [valueTitle]);

  return (
    <div className="category">
      <div className="container">
        <div className="category_container">
          <div className="category_search">
            <Input
              type="text"
              placeholder="Search title or status"
              value={valueTitle}
              onChange={handleOnChange}
            />
            <Button onClick={handleOnClick}>Search</Button>
          </div>
          <Link to={`/${category}/create`}>
            <Button onClick={handleOnClick}>Create</Button>
          </Link>
          <TableHome item={categoryItem} type={`${category}`} />
        </div>
      </div>
    </div>
  );
}

export default Movie;
