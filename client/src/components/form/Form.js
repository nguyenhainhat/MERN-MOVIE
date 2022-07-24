import React, { useContext, useState } from "react";
import Modal, { ModalContent } from "../modal/Modal";
import { useController, useForm } from "react-hook-form";
import "./form.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-movie-mern.png";
import { postLoginUser, postSignUpUser } from "../../api/constants";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { infoLogin, signIn, signUp, stateSignIn } from "../../features/users/usersSlice";
import {
  auth,
  providerFb,
  providerGoogle,
  signInWithFacebook,
  signInWithGoogle,
} from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";

const Form = () => {
  const [btnAuth, setBtnAuth] = React.useState(true);
  const handleBtnAuth = () => {
    setBtnAuth(!btnAuth);
  };

  return (
    <Modal active={false}>
      <ModalContent>
        <div className="state_auth">
          <button
            onClick={handleBtnAuth}
            className={`${
              btnAuth ? "active " : ""
            }state_auth-btn state_auth__signIn`}
          >
            Sign In
          </button>
          <button
            onClick={handleBtnAuth}
            className={`${
              btnAuth ? "" : "active "
            }state_auth-btn state_auth__signUp`}
          >
            Sign Up
          </button>
        </div>
        {/* <div className="form_container"> */}
        {btnAuth ? <SignIn /> : <SignUp />}
        {/* </div> */}
      </ModalContent>
    </Modal>
  );
};

const SignIn = () => {
  const info = useSelector((state) => state.users.userSignUp);
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(false);

  const { register, handleSubmit } = useForm({});
  const onSubmit = async (data) => {
    const res = await postLoginUser(data);
    // console.log(data, info.length === 0, typeof info)
    localStorage.setItem("name", info.username || data.username);
    localStorage.setItem("password", info.password || data.password);
    localStorage.setItem("email", info.email || data.email);
    localStorage.setItem("id", res?.data._id);
    localStorage.setItem("token",res?.data.accessToken);
    dispatch(stateSignIn(!!signIn));
    dispatch(infoLogin(data))
  };

  const signInWithGoogle = async() => {
      await signInWithPopup(auth, providerGoogle)
        .then((result) => {
          const name = result.user.displayName;
          const email = result.user.email;
          const profilePic = result.user.photoURL;
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("profilePic", profilePic);
        console.log(result.user)
        })
        .catch((error) => {
          console.log(error);
        });
       dispatch(stateSignIn(!!signIn));
  };


  const signInWithFacebook = async () => {
    await signInWithPopup(auth, providerFb)
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        console.log(user)
        localStorage.setItem("name", name);
      })
      .catch((error) => {
        console.log(error);
      });
      dispatch(stateSignIn(!!signIn));
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_item form_signIn">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          {info.username !== undefined ? (
            <input
              {...register("username", { required: true })}
              className="form-input"
              type="text"
              value={info.username}
            />
          ) : (
            <input
              {...register("username", { required: true })}
              placeholder="Name"
              className="form-input"
              type="text"
            />
          )}
          <input
            {...register("password", { minLength: 6 })}
            placeholder="Password"
            type="password"
            className="form-input"
          />
          <div className="form-btn_social">
            <button onClick={signInWithGoogle}>
              <FcGoogle />
            </button>
            <button>
              <FaFacebookSquare onClick={signInWithFacebook} />
            </button>
          </div>
          <button type="submit" className="form-btn">
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

const SignUp = () => {
  const { register, handleSubmit } = useForm({});
  const [stateSignUp, setStateSignUp] = useState(false);
  const info = useSelector((state) => state.users.userSignUp);
  
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setStateSignUp(true);
    await postSignUpUser(data);
    dispatch(signUp(data));
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_item form_signIn">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <input
            {...register("username", { required: true })}
            placeholder="Name"
            className="form-input"
            type="text"
          />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="form-input"
            type="email"
          />
          <input
            {...register("password", { minLength: 6 })}
            placeholder="Password"
            type="password"
            className="form-input"
          />
          <button type="submit" className="form-btn">
            Sign up
          </button>
          {stateSignUp && info.username !== undefined ? (
            <p>Sign up successfully</p>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
