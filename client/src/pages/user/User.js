import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./user.scss";
import UpdateUser from "./UpdateUser";
import ViewUser from "./ViewUser";

const userNav = [
  {
    title: "User Profile",
    path: "/user/update",
  },
  {
    title: "History",
    path: "/user/view",
  },
];

const User = () => {
  const location = useLocation();
  const history = useNavigate();
  const params = useParams();
  const activeLink = ({ isActive }) => {
    return isActive ? "active" : "";
  };
  return (
    <section class="section section--user section--user-profile">
      <div class="container canal-v">
        <div class="section__header">
          <h1 class="title title-white">My account</h1>
        </div>
        <div class="section__body">
          <ul>
            {userNav.map((item, index) => (
              <li key={index}>
                <NavLink className={activeLink} to={item.path}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {params.func === "update" ? <UpdateUser /> : <ViewUser />}
      </div>
    </section>
  );
};

export default User;
