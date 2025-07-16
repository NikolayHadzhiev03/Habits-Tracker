import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logouthanler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login")
  }

  return (
    <nav className="nav">
      <div className="brand">🌿 HabitTracker</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/stats">Stats</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">{user.username}'profile</Link></li>
            <li><Link to="/add-habit">Add Habit</Link></li>
            <li><button onClick={logouthanler} className="logout-link">Logout</button></li>
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
