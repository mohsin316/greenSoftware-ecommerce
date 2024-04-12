import "./Dashboard.css";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Arrow from "../../assets/shared/right-arrow.png";

export default function Dashboard() {
  const { user } = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="dashboard-section">
      <aside>
        <h1>
          Welcome <span>{user.username}</span>
        </h1>
        <div onClick={() => setIsOpen(!isOpen)} className="aside-dropdown">
          <strong>Account</strong>
          <ul className={`${isOpen ? "" : "hide"}`}>
            <li>
              <Link to="/dashboard">Orders</Link>
            </li>
            {user.isAdmin && (
              <li>
                <Link to="create">Create</Link>
              </li>
            )}
            {user.isAdmin && (
              <li>
                <Link to="edit">Edit</Link>
              </li>
            )}
          </ul>
          <img
            className={`${isOpen ? "rotate" : ""}`}
            src={Arrow}
            alt="arrow"
          />
        </div>
      </aside>
      <div className="container">
        <Outlet />
      </div>
    </section>
  );
}
