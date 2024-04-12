// styles
import "./Signup.css";

import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../assets/shared/loader.json";

// imports
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion as m, AnimatePresence } from "framer-motion";

// rtk
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentUser } from "../features/authSlice";
import { useSignupMutation } from "../features/authApiSlice";

// rr6
import { useLocation, useNavigate } from "react-router-dom";

// images
import Avatar from "../assets/shared/user.png";
import Padlock from "../assets/shared/padlock.png";
import Username from "../assets/shared/id-card.png";

const loginSchema = z.object({
  username: z.string().trim().min(5, "Must be at least 5 characters in length"),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length"),
});

export default function Signup() {
  const { accessToken: user } = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data) => {
    setError("");
    try {
      const userData = await signup({ ...data }).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setError(error.data.error);
    }
  };
  return (
    <section className="signup-section">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Signup</h2>
          <label>
            <img src={Username} alt="Username" />
            <input
              placeholder="username"
              {...register("username")}
              type="text"
            />
          </label>
          {errors.username && (
            <small className="error">{errors.username.message}</small>
          )}
          <label>
            <img src={Avatar} alt="avatar" />
            <input placeholder="Email" {...register("email")} type="text" />
          </label>
          {errors.email && (
            <small className="error">{errors.email.message}</small>
          )}
          <label>
            <img src={Padlock} alt="Padlock" />
            <input
              placeholder="Password"
              {...register("password")}
              type="password"
            />
          </label>
          {errors.password && (
            <small className="error">{errors.password.message}</small>
          )}
          {error && <small className="server-error">{error}</small>}
          <m.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ opacity: 0.8, scale: 1.1 }}
            disabled={isLoading}
          >
            signup
          </m.button>
          {isLoading && (
            <Player className="loader" autoplay loop src={Loader}></Player>
          )}
        </form>
      </div>
    </section>
  );
}
