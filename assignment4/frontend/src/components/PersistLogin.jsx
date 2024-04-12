import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentUser } from "../features/authSlice";
import { useEffect, useState } from "react";
import InitialLoaderPage from "./loaders/InitialLoaderPage";

export default function PersistLogin() {
  const [isLoading, setIsloading] = useState(true);
  const { accessToken: user } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/app2/auth/refresh`,
      { credentials: "include" }
    );
    const data = await response.json();
    dispatch(setCredentials({ ...data }));
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        setIsloading(false);
      } finally {
        setIsloading(false);
      }
    };
    !user ? verifyRefreshToken() : setIsloading(false);
  }, []);

  return <>{isLoading ? <InitialLoaderPage /> : <Outlet />}</>;

  // Abandoned code below

  // useEffect(() => {
  //   console.log(`isLoading:  ${isLoading}`);
  //   console.log(`aT:  ${user}`);
  //   console.log();
  // }, [isLoading]);

  // const { accessToken: user } = useSelector(selectCurrentUser);
  // const { data, isLoading } = useRefreshQuery();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("hitttttttttttttttttttt");
  //   const verifyRefreshToken = () => {
  //     console.log("inside try block");
  //     dispatch(setCredentials({ ...data }));
  //   };
  //   !user ? verifyRefreshToken() : null;
  // }, [data, user]);

  // useEffect(() => {
  //   console.log(`data:  ${data?.accessToken}`);
  //   console.log(`isLoading:  ${isLoading}`);
  //   console.log(" ");
  // }, [data, isLoading, user]);
}
