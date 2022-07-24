import MovieReducer from "./MovieReducer";
import { createContext, useEffect, useReducer } from "react";

const INITTAL_STATE = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext();

export const MovieContextProvier = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITTAL_STATE);

  const { movies, isFetching, error } = state;


  const value = {
    movies: movies,
    isFetching: isFetching,
    error: error,
    dispatch,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
