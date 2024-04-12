import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authSlice";

export default function RequireAdmin() {
  const { user } = useSelector(selectCurrentUser);
  return user.isAdmin ? <Outlet /> : <Navigate to="/" />;
}
