export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} HabitTracker. All rights reserved.</p>
        <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-600">Terms</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}
