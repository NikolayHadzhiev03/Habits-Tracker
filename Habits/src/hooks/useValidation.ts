import toast from "react-hot-toast";

export function useValidation() {
  const validateCredentials = (
    email: string,
    password: string,
    repassword?: string,
    username?: string
  ): boolean => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return false;
    }

    if (username !== undefined && username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return false;
    }

    if (repassword !== undefined && password !== repassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  return { validateCredentials };
}
