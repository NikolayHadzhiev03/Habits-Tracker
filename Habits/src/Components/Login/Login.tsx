import { useNavigate } from "react-router";
import { useLogin } from "../../apis/authapi";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useValidation } from "../../hooks/useValidation";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login: apiLogin } = useLogin();
  const { login } = useContext(UserContext);
  const { validateCredentials } = useValidation();
  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!validateCredentials(email, password)) {
      return
    }

    try {
      const authData = await apiLogin(email, password);
      if (authData.token && authData.user) {
        login(authData.user, authData.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1);
      } else {
        const message = authData.message || "Login failed. Please try again.";
        toast.error(message);
      }
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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={onLogin}>
          <div>
            <label htmlFor="email" className="login-label">Email</label>
            <input type="email" id="email" name="email" className="login-input" />
          </div>

          <div>
            <label htmlFor="password" className="login-label">Password</label>
            <input type="password" id="password" name="password" className="login-input" />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
