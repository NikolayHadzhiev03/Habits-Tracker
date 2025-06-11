import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to HabitTracker 🌿
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mb-6">
        Track your daily habits, build better routines, and become the best version of yourself.
      </p>
      <Link
        to="/stats"
        className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-lg font-semibold transition"
      >
        View Statistics
      </Link>
    </div>
  );
}
