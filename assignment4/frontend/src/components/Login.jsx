import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../assets/shared/loader.json";

// styles
import "./Login.css";

// imports
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion as m, AnimatePresence } from "framer-motion";

// rtk
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentUser } from "../features/authSlice";
import { useLoginMutation } from "../features/authApiSlice";

// rr6
import { useLocation, useNavigate } from "react-router-dom";

// images
import Avatar from "../assets/shared/user.png";
import Padlock from "../assets/shared/padlock.png";

const loginSchema = z.object({
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

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { accessToken: user } = useSelector(selectCurrentUser);

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
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    setError("");
    try {
      const userData = await login({ ...data }).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.data.error);
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
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
            Login
          </m.button>
          {isLoading && (
            <Player className="loader" autoplay loop src={Loader}></Player>
          )}
        </form>
      </div>
    </section>
  );
}
