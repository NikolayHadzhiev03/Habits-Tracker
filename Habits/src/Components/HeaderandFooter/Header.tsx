import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/userContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow">
      <div className="font-bold text-xl text-gray-800 dark:text-white">🌿 HabitTracker</div>
      <ul className="flex space-x-4 text-gray-700 dark:text-gray-300">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
        <li><Link to="/register" className="hover:text-blue-600">Register</Link></li>
        <li><Link to="/profile" className="hover:text-blue-600">`{user?.username}`</Link></li>
        <li><Link to="/add-habit" className="hover:text-blue-600">Add Habit</Link></li>
        <li><Link to="/stats" className="hover:text-blue-600">Stats</Link></li>
      </ul>
    </nav>
  );
}
