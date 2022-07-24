import request, { type } from "./request";

// delete category.
export const deleteUser = (id, params) => {
    const url = `/user/${id}`;
    return request.delete(url, params);
}

export const deleteComment = (id, params) => {
    const url = `/user/comment/${id}`;
    return request.delete(url, params);
}

export const deleteCategory = (category, id, params) => {
    const url = `/${category}/${id}`;
    return request.delete(url, params);
}

// post
export const postCast = (params) => {
    const url = "/list/cast/";
    return request.post(url, params);
}

export const postEpisode = (params) => {
    const url = "/tv/episodes/";
    return request.post(url, params);
}

export const postSeason = (params) => {
    const url = "/tv/seasons/";
    return request.post(url, params);
}

export const postCategory = (category,params) => {
    const url = `/${category}/`;
    return request.post(url, params);
}

export const postDetailCast = (params) => {
    const url = "/list/cast/detail";
    return request.post(url, params);
}

export const postDetailGenre = (params) => {
    const url = "/list/genre/detail";
    return request.post(url, params);
}

// put category

export const putEpisode = async(id,params) => {
    const url =  `/tv/episodes/${id}`;
    return request.put(url, params);
}

export const putCategory = (category,id,params) => {
    const url = `/${category}/${id}`;
    return request.put(url, params);
}
export const putTypeCast = async(id,params) => {
    const url =  `/list/cast/${id}`;
    return request.put(url, params);
}

export const putSeason = async(id,params) => {
    const url =  `/tv/seasons/${id}`;
    return request.put(url, params);
}


// get user
export const getUser = async(params) => {
    const url =  '/user/';
    return request.get(url, params);
}

export const getCommentUser = async(params) => {
    const url =  '/user/comment/';
    return request.get(url, params);
}

export const getUserStats = (id, params) => {
    const url = "/user/stats";
    return request.get(url, params);
}
// Get movie, tv

export const getEpisodeOfSeason = (id, season) => {
    const url = `/tv/episodes/${id}?s=${season}`;
    return request.get(url);
}

export const getEpisodeOfTv = (id) => {
    const url = `/tv/episodes/${id}`;
    return request.get(url);
}

export const getAllSeasonOfId = (id, params) => {
    const url = `/tv/seasons/${id}`;
    return request.get(url, params);
}

export const getTypeTvId = async(id,params) => {
    const url =  `/tv/${id}`;
    return request.get(url, params);
}

export const getTypeTv = async(params) => {
    const url =  '/tv/';
    return request.get(url, params);
}

export const getTypeMovie = async(params) => {
    const url =  '/movie/';
    return request.get(url, params);
}

export const getTypeGenre = async(params) => {
    const url =  '/list/genre';
    return request.get(url, params);
}

export const getTypeCast = async(params) => {
    const url =  '/list/cast';
    return request.get(url, params);
}

export const getMovieVote = (params) => {
    const url =  'movie/type/vote';
    return request.get(url, params);
}
export const getMovieTrending = (params) => {
    const url =  'movie/type/trending';
    return request.get(url, params);
}

export const getTvVote = (params) => {
    const url =  'tv/type/vote';
    return request.get(url, params);
}
export const getTvTrending = (params) => {
    const url =  'tv/type/trending';
    return request.get(url, params);
}

// 

export const getTypeList = (category, typeItem, params) => {
    const url =  category + '/type/' + type[typeItem];
    return request.get(url, params);
}
export const getType = async(category, params) => {
    const url =  category + '/';
    return request.get(url, params);
}

export const getList = (category, id, params) => {
    const url =  category + '/' + id;
    return request.get(url, params);
}

export const getSeason = (id, season) => {
    const url = `/tv/episodes/?id=${id}&s=${season}`;
    return request.get(url);
}

