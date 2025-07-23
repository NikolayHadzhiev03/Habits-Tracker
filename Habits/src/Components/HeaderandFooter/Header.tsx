import { useContext } from "react";
import { Link, useNavigate } from "react-router"
import { UserContext } from "../../context/userContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="brand">🌿 HabitTracker</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/stats">Stats</Link></li>

        {user ? (
          <>
            <li>
              <Link to="/profile">{user.username}'s Profile</Link>
            </li>
            <li><Link to="/add-habit">Add Habit</Link></li>
            <li>
              <button onClick={logoutHandler} className="logout-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
