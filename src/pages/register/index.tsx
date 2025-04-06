import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.scss";
import { CutIcon } from "../../components/iconsholder";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    navigate("/");
  };

  return (
    <>
      <div className="cut-icon-container">
        <img src={CutIcon} alt="" />
      </div>
      <div className="register-container">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              aria-describedby={emailError ? "email-error" : undefined}
            />
            {emailError && (
              <span id="email-error" className="error-message">
                {emailError}
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              aria-describedby={passwordError ? "password-error" : undefined}
            />
            {passwordError && (
              <span id="password-error" className="error-message">
                {passwordError}
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              aria-describedby={
                confirmPasswordError ? "confirm-password-error" : undefined
              }
            />
            {confirmPasswordError && (
              <span id="confirm-password-error" className="error-message">
                {confirmPasswordError}
              </span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/" className="link">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
