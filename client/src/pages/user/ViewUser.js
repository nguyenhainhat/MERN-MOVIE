import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { viewerHistory } from "../../features/users/usersSlice";
import "./user.scss";

const ViewUser = () => {
  const location = useLocation();
  const [viewUser, setViewUser] = useState([]);
  const dispatch = useDispatch();

  const detailItem = useSelector((state) => state.details.detailItemss);
  const signIn = useSelector((state) => state.users.signIn);

  const infoDetail = JSON.parse(localStorage.getItem("detailItem"));
  const typeDetail = JSON.parse(localStorage.getItem("type"));
  useEffect(() => {
    if (signIn === true) {
      localStorage.setItem("detailItem", JSON.stringify(detailItem));
    }
  }, [detailItem]);

  const handleClickDetail = () => {
    if (signIn === true) {
      dispatch(viewerHistory(infoDetail));
    }
  };

  return (
    <>
      <div className="section_view">
        {infoDetail?.map((item, index) => {
          return (
            <NavLink
              to={`/${typeDetail}/${item?._id}`}
              onClick={handleClickDetail}
            >
              <img
                src={item !== null && item?.backdrop_path}
                alt={item !== null && item?.title}
              />
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default ViewUser;
