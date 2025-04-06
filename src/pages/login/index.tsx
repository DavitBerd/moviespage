import { useContext, useState, FormEvent } from "react";
import { AuthContext } from "../../components/AuthProvider";
import { Link } from "react-router-dom";
import "./style.scss";
import { CutIcon } from "../../components/iconsholder";

const LogIn = () => {
  const { updateFn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();


    setEmailError("");
    setPasswordError("");

    let hasError = false;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }
    if (email === "Datobato@gmail.com" && password === "123456") {
      if (updateFn) {
        updateFn();
      }
    } else {
      setEmailError("Invalid email or password");
      setPasswordError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="cut-icon-container">
        <img src={CutIcon} alt="" />
      </div>
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Datobato@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account?
          <Link to="/register" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LogIn;
