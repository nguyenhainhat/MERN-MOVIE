import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { putUser } from "../../api/constants";
import User from "./User";
// import "./updateUser.scss"

const UpdateUser = () => {
  const { register, handleSubmit } = useForm({});
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const onSubmit = async (data) => {
    const respon = await putUser(localStorage.getItem("id"), data);
    localStorage.setItem("name", respon.data.username);
    localStorage.setItem("email", respon.data.email);
    localStorage.setItem("id", respon.data._id);
    localStorage.setItem("password", respon.data.password);
  };
  return (
    <>
      <div className="section__content">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: true })}
            placeholder={name}
            className="form-input"
            type="text"
          />
          <input
            {...register("email", { required: true })}
            placeholder={email}
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
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
