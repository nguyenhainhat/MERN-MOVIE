import React from 'react'
import {Route, Routes, Outlet} from "react-router-dom";
import Header from '../components/header/Header';
import Home from "../pages/Home"
import NotFound from "../pages/NotFound";
// import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Episodes from "../pages/watch/TV/Episodes";
// import PageEpisodes from "../pages/watch/TV/PageEpisodes";
import Movies from "../pages/watch/movies/Movies";
import Catalog from '../pages/Catalog';
import UpdateUser from '../pages/user/User';
import ViewUser from '../pages/user/ViewUser';
import User from '../pages/user/User';

const Router = () => {
  return (
    
    <Routes>
        <Route index path="/" element={<Home />}/>
        <Route path='*' element={<NotFound/>} />
        <Route exact path="user/:func" element={<User />}/>
        <Route path=":category" element={<Catalog />}/>
        <Route path=":category/:id" element={<Detail />}/>
        <Route path=":category/:id/watch" element={<Movies />}/>
        <Route path=":category/:id/watch/season/:season/episodes/:episode" element={<Episodes />}/>
    </Routes>
  )
}

export default Router;