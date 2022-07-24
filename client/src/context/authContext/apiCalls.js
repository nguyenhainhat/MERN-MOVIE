import axios from "axios";
import { postSignUpUser } from "../../api/constants";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const SignUp = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await postSignUpUser(user);
    res.data.admin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
