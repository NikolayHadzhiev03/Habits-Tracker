import { Link } from "react-router";
export default function Home() {

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div className={`home-container ${isDark ? 'dark' : ''}`}>
      <h1 className="home-title">
        Welcome to HabitTracker 🌿
      </h1>
      <p className="home-description">
        Track your daily habits, build better routines, and become the best version of yourself.
      </p>
      <Link to="/stats" className="home-button">
        View Statistics
      </Link>
    </div>
  );

}
