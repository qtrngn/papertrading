import { useState } from "react";
import { login, signInWithGoogle, signInWithApple, sendPasswordReset } from "./authService";
import SocialButton from "../../components/SocialButton";

const LoginForm = ({ onSwitch }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStatus, setResetStatus] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      setError(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message || "Login with Google failed");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      setError(error.message || "Login with Apple failed");
    }
  };

  const handlePasswordReset = async (e) => {
    if (!resetEmail) {
      setResetStatus("Please enter your email address");
      return;
    }
    try {
      await sendPasswordReset(resetEmail);
      setResetStatus("Password reset email sent");
      setTimeout(() => {
        setShowResetModal(false);
        setResetStatus(null);
      }, 3000);
    } catch (error) {
      setResetStatus(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Email address input */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="neon-input"
            value={credentials.email}
            onChange={handleChange}
            placeholder="email@example.com"
          ></input>
        </div>
        {/* password input */}
        <div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="neon-input"
              placeholder="********"
            />
          </div>

          {/* forgot password button */}
          <div className="flex justify-end mt-1">
            <button
              type="text"
              onClick={() => setShowResetModal(true)}
              className="neon-text-button text-sm "
            >
              {" "}
              Forgot Password?
            </button>
          </div>

          {/* error message */}
          {error && (
            <div className="bg-red-900 text-red-200 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* login button */}
        <button type="submit" disabled={loading} className="neon-button">
          {loading ? "Logging in..." : "Login"}
        </button>
        {/* continue with google */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-transparent text-gray-400 mt-4">
            Or continue with
          </span>
        </div>

        <div className="flex justify-center space-x-4">
          <SocialButton provider="google" 
          onClick={handleGoogleLogin} />

          <SocialButton
            provider="apple"
            onClick={handleAppleLogin}
          />
        </div>

        <div className="text-center text-sm mt-4">
          <p>
            Don't have an account ? {""}
            <button type="text" onClick={onSwitch} className="neon-text-button">
              Register here
            </button>
          </p>
        </div>
      </form>

      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Reset Password</h3>
              <button
                onClick={() => {
                  setShowResetModal(false);
                  setResetStatus(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {resetStatus ? (
              <div
                className={`p-4 rounded-lg mb-4 ${
                  resetStatus.includes("sent")
                    ? "bg-green-900 text-green-200"
                    : "bg-red-900 text-red-200"
                }`}
              >
                {resetStatus}
              </div>
            ) : (
              <>
                <p className="text-gray-300 mb-4">
                  Enter your email address below and we'll send you a link to
                  reset your password.
                </p>

                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-non focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="email@example.com"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3">
              {!resetStatus && (
                <>
                  <button
                    onClick={() => {
                      setShowResetModal(false);
                      setResetStatus(null);
                    }}
                    className="px-4 py-2 text-gray-300 hover:text-white transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePasswordReset}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition"
                  >
                    Send Reset Link
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
