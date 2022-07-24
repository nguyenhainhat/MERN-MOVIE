import axios from "axios";
import {
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  deleteMoviesStart,
  deleteMoviesSuccess,
  deleteMoviesFailure,
  createMoviesStart,
  createMoviesSuccess,
  createMoviesFailure,
  updateMoviesStart,
  updateMoviesSuccess,
  updateMoviesFailure,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movie", {
      headers: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGQ5YjQ3ZWVlZmE1NmVkMTA3NzQyMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDM0NDE0MywiZXhwIjoxNjUxNjQwMTQzfQ.sZfgB0odgimKKMNJEWYfqGk_mD0aWyS7yRrr-xuC8jA" ,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};

export const createMovies = async (movie, dispatch) => {
  dispatch(createMoviesStart());
  try {
   const res = await axios.post("/movie/", movie, {
      headers: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGQ5YjQ3ZWVlZmE1NmVkMTA3NzQyMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDM0NDE0MywiZXhwIjoxNjUxNjQwMTQzfQ.sZfgB0odgimKKMNJEWYfqGk_mD0aWyS7yRrr-xuC8jA" ,
      },
    });
    dispatch(createMoviesSuccess(res.data));
  } catch (error) {
    dispatch(createMoviesFailure());
  }
};


export const updateMovies = async (movie, dispatch) => {
  dispatch(updateMoviesStart());
  console.log(movie._id)
  try {
   await axios.put("/movie/" + movie._id, {
      headers: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGQ5YjQ3ZWVlZmE1NmVkMTA3NzQyMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDM0NDE0MywiZXhwIjoxNjUxNjQwMTQzfQ.sZfgB0odgimKKMNJEWYfqGk_mD0aWyS7yRrr-xuC8jA" ,
      },
    });
    dispatch(updateMoviesSuccess(movie));
  } catch (error) {
    dispatch(updateMoviesFailure());
  }
};



export const deleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    await axios.delete("/movie/" + id, {
      headers: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGQ5YjQ3ZWVlZmE1NmVkMTA3NzQyMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDM0NDE0MywiZXhwIjoxNjUxNjQwMTQzfQ.sZfgB0odgimKKMNJEWYfqGk_mD0aWyS7yRrr-xuC8jA" ,
      },
    });
    dispatch(deleteMoviesSuccess(id));
  } catch (error) {
    dispatch(deleteMoviesFailure());
  }
};
