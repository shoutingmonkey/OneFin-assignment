
import { React, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ThreeCircles } from "react-loader-spinner";

const timer = (delay) => new Promise((res) => setTimeout(res, delay));

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    async function redirect() {
      if (localStorage.getItem("authToken")) {
        setIsSuccess(true);
        await timer(2000);
        navigate("movielist");
      }
    }
    redirect();
  });

  const onSubmit = async (data, e) => {
    const { username, password } = data;
    let response;
    setIsLoading(true);
    try {
      response = await axios.post(
        "https://demo.credy.in/api/v1/usermodule/login/",
        { username, password }
      );
    } catch (e) {
      alert("Invalid Username or Password");
    }
    if (response?.data.is_success) {
      localStorage.setItem("authToken", response.data.data.token);
      setIsSuccess(true);
      await timer(2000);
      navigate("movielist");
    }
    setIsLoading(false);
  };

  return isSuccess ? (
    <ThreeCircles
      color="white"
      height={110}
      width={110}
      ariaLabel="three-circles-rotating"
    />
  ) : (
    <div className="login">
      <fieldset>
        <legend>Login</legend>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: 4,
            })}
            placeholder="Enter Username"
          />
          {<p style={{ color: "red" }}>{errors.username?.message}</p>}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 4,
            })}
            type="password"
            placeholder="Enter Password"
          />
          {<p style={{ color: "red" }}>{errors.password?.message}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default Login;
