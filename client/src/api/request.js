import axios from "axios";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const type = {
    trending: 'trending',
    vote: 'vote',
}

const request = axios.create({
    baseURL: "http://localhost:8000/",
})



export default request;