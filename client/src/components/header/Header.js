import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/logo-movie-mern.png";
import "./header.scss";
import { BiUserCircle, BiBell } from "react-icons/bi";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Form from "../form/Form";
import { useDispatch, useSelector } from "react-redux";
import { detailItemRemove } from "../../features/detail/detailSlice";
import { auth, signInWithGoogle } from "../../firebase";
import { stateModal } from "../../features/modal/modalSlice";
import { infoLogin, stateSignIn } from "../../features/users/usersSlice";

const headerNav = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Movie",
    path: "/movie",
  },
  {
    title: "Tv",
    path: "/tv",
  },
];

const Header = () => {
  // const pathName = useLocation();
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const { height, width } = useWindowDimensions();
  // const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState("");
  const [login, setLogin] = useState(false);
  // const active =s
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.users.signIn);

  const activeLink = ({ isActive }) => {
    return isActive ? "active" : "";
  };

  const handleClickMenu = () => {
    if (width < 768) {
      setMenu(!menu);
    }
  };

  useEffect(() => {
    if (width > 768) listRef.current.classList.remove("nav_open");
  }, [width]);

  const handleClickSignIn = () => {
    setLogout(false);
    setModal(!modal);
    dispatch(stateSignIn(setLogin(true)));
  };

  const handleClickSignOut = () => {
    localStorage.clear();
    dispatch(detailItemRemove([]));
    dispatch(infoLogin({}));
    setLogout(true);
  };

  useEffect(() => {
    const localName = localStorage.getItem("name");
    if (localName !== null) {
      setUserName(localName);
    }
  },[signIn])
  console.log(signIn, logout)


  return (
    <div ref={headerRef} className="header" id="header">
      <div className="container">
        <div className="row">
          <div className="header_container col-12">
            <div className="header_logo col-4 col-md-4">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="header_menu s col-4 col-md-4">
              <button
                className={`${
                  menu ? "header_menu-btn menu_open" : "header_menu-btn"
                }`}
                onClick={handleClickMenu}
              >
                <div>Menu</div>
              </button>
              <ul
                ref={listRef}
                className={`${menu ? "header_nav nav_open" : "header_nav"}`}
              >
                {headerNav.map((eml, i) => (
                  <li key={i}>
                    <NavLink className={activeLink} to={eml.path}>
                      {eml.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="header_info col-4 col-md-4">
              {signIn === false && logout === false ? (
                <>
                 
                  <div className="header_info_user">
                    <p className="header_info_login">
                      {userName}
                    </p>

                    <div className="header_info_dropdown">
                      <p>
                        <Link to="user/update"> Account Setting </Link>
                      </p>
                      <p onClick={handleClickSignOut}>Sign Out</p>
                    </div>
                  </div>
                </>
              ) : (
                <button className="header-btn" onClick={handleClickSignIn}>
                  SIGN IN
                </button>
              )}
            </div>
          </div>
          {signIn === undefined ? <Form /> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
