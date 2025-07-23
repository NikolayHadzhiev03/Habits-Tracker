import { useRegister } from "../../apis/authapi";
import { useNavigate } from "react-router";

export default function Register() {
  const { register } = useRegister();
  const navigate = useNavigate();

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const repassword = data.get("repassword") as string;

    if (password !== repassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await register(username, email, password, repassword);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={onRegister}>
          <label htmlFor="username" className="register-label">Username</label>
          <input type="text" id="username" name="username" required className="register-input" />

          <label htmlFor="email" className="register-label">Email</label>
          <input type="email" id="email" name="email" required className="register-input" />

          <label htmlFor="password" className="register-label">Password</label>
          <input type="password" id="password" name="password" required className="register-input" />

          <label htmlFor="repassword" className="register-label">Repeat Password</label>
          <input type="password" id="repassword" name="repassword" required className="register-input" />

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
