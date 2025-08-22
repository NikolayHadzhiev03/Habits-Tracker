import { useRegister } from "../../apis/authapi";
import { useNavigate } from "react-router";
import { useValidation } from "../../hooks/useValidation";
import toast from "react-hot-toast";
export default function Register() {
  const { register } = useRegister();
  const navigate = useNavigate();
  const { validateCredentials } = useValidation();
  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const repassword = data.get("repassword") as string;

    if (!validateCredentials(email, password, repassword, username)) return;

    try {
      await register(username, email, password, repassword);
      navigate("/login");
    } catch (error: any) {
      try {
        const jsonPart = error.message.split("-")[1].trim();
        const data = JSON.parse(jsonPart);
        toast.error(data.error || "Login failed");
      } catch {
        toast.error(error.message);
      }

    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={onRegister}>
          <label htmlFor="username" className="register-label">Username</label>
          <input type="text" id="username" name="username" className="register-input" />

          <label htmlFor="email" className="register-label">Email</label>
          <input type="email" id="email" name="email" className="register-input" />

          <label htmlFor="password" className="register-label">Password</label>
          <input type="password" id="password" name="password" className="register-input" />

          <label htmlFor="repassword" className="register-label">Repeat Password</label>
          <input type="password" id="repassword" name="repassword" className="register-input" />

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
