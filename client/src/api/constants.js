import request, { type } from "./request";

// delete comment user
export const deleteCommentUser = (id, params) => {
    const url = `/user/comment/${id}`;
    return request.delete(url, params);
}

// Put user

export const putUser = (id, params) => {
    const url = `/user/update/${id}`;
    return request.put(url, params);
}

// Post request user
export const postCommentUser = async(params) => {
    const url =  '/user/comment/';
    return request.post(url, params);
}

export const postSignUpUser = (params) => {
    const url =  "auth/register";
    return request.post(url, params);
}

export const postLoginUser = (params) => {
    const url =  "auth/login";
    return request.post(url, params);
}

// Get all categories
export const getCommentUser = async(params) => {
    const url =  '/user/comment/';
    return request.get(url, params);
}

export const getTypeMovie = async(params) => {
    const url =  '/tv/';
    return request.get(url, params);
}

export const getType = async(category, params) => {
    const url =  category + '/';
    return request.get(url, params);
}

export const getTypeList = (category, typeItem, params) => {
    const url =  category + '/type/' + type[typeItem];
    return request.get(url, params);
}

export const getList = (category, id, params) => {
    const url =  category + '/' + id;
    return request.get(url, params);
}

export const getSimilar = (category, id, params) => {
    const url =  category + '/similar/' + id;
    return request.get(url, params);
}

export const getSeason = (id, season) => {
    const url = `/tv/episodes/?id=${id}&s=${season}`;
    return request.get(url);
}

export const getEpisode = (id, season, episode) => {
    const url = `/tv/episodes/?id=${id}&s=${season}&e=${episode}`;
    return request.get(url);
}

export const embedMovie = (id) =>
  `https://www.2embed.org/embed/movie?tmdb=${id}`;

  export const embedEpisode = (id, season, episode) =>
  `https://2embed.org/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`;