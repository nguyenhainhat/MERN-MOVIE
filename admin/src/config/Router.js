import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/home/Home";
import Sidebar from "../components/sidebar/Sidebar";
import User from "../pages/user/User";
import Movie from "../pages/movie/info/Movie";
import NewProduct from "../pages/category/newItem/NewProduct";
import Update from "../pages/category/update/Update";
import List from "../pages/list/List";
import Season from "../pages/category/createSeason/Season"
import UpdateSeason from "../pages/category/update/UpdateSeason";
import CommentUser from "../pages/user/CommentUser";
import UpdateEpisode from "../pages/category/update/UpdateEpisode";

const Router = () => {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/comment" element={<CommentUser />} />
        <Route path="/:category" element={<Movie />} />
        <Route path="/:category/create/" element={<NewProduct />} />
        <Route path="/:category/update/:id" element={<Update />} />
        <Route path="/:category/update/:id/season/:season" element={<UpdateSeason />} />
        <Route path="/:category/update/:id/season/:season/episode/:episode" element={<UpdateEpisode />} />
        <Route path="/tv/create/season" element={<Season />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
};

export default Router;
