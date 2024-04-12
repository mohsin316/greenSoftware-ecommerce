// styles
import "./UserLoginSignup.css";

// rr6
import { Link, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logOut } from "../features/authSlice";
import { useLogoutMutation } from "../features/authApiSlice";

export default function UserLoginSignup({ setIsAvatarOpen }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { accessToken: user } = useSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    setIsAvatarOpen(false);
    await logout();
    dispatch(logOut());
  };

  return (
    <div className="loginSignup-container flow">
      {!user && (
        <>
          <Link
            to="/signup"
            className="signup-button"
            state={{ from: location }}
            replace
            onClick={() => setIsAvatarOpen(false)}
          >
            Signup
          </Link>
          <Link
            to="/login"
            state={{ from: location }}
            replace
            onClick={() => setIsAvatarOpen(false)}
          >
            login
          </Link>
        </>
      )}
      {user && (
        <>
          <Link
            to="/dashboard"
            state={{ from: location }}
            replace
            onClick={() => setIsAvatarOpen(false)}
            className="checkout-button"
          >
            Account
          </Link>

          <button className="logout-button" onClick={handleLogout}>
            logout
          </button>
        </>
      )}
    </div>
  );
}
