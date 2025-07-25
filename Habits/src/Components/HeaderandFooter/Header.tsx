import { useContext } from "react";
import { Link } from "react-router"
import { UserContext } from "../../context/userContext";

export default function Header() {
  const { user, } = useContext(UserContext);

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
