export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} HabitTracker. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
