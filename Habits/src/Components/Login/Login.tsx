import { useNavigate } from "react-router";
import { useLogin } from "../../apis/authapi";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login: apiLogin } = useLogin();
  const { login } = useContext(UserContext);

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      console.error("Email or password is missing");
      return;
    }

    try {
      const authData = await apiLogin(email, password);
      if (authData.token && authData.user) {
        login(authData.user, authData.token);
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log(error);
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
