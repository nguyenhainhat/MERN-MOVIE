import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const INITTAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext();

export const AuthContextProvier = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITTAL_STATE);

  const { user, isFetching, error } = state;
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);


  const value = {
    user: user,
    isFetching: isFetching,
    error: error,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
