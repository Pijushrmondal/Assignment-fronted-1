import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import ErrorBox from "../../components/common/ErrorBox";

export default function SignupPage() {
  const { token, login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR">("EDITOR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/screens", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await signup({ email, password, role });
      setAuth(response.token, {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role,
      });
      navigate("/screens");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--spacing-xl)"
    }}>
      <div className="card" style={{ 
        maxWidth: "440px", 
        width: "100%",
        boxShadow: "var(--shadow-xl)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-xl)" }}>
          <h1 style={{ 
            marginBottom: "0.5rem", 
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "var(--text-primary)",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Create Account
          </h1>
          <p style={{ 
            color: "var(--text-secondary)",
            fontSize: "0.875rem"
          }}>
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <label className="label">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="user@example.com"
            />
          </div>

          <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <label className="label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input"
              placeholder="At least 6 characters"
            />
          </div>

          <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <label className="label">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="input"
              placeholder="Confirm your password"
            />
          </div>

          <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <label className="label">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "ADMIN" | "EDITOR")}
              required
              className="input"
              style={{ cursor: "pointer" }}
            >
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {error && <ErrorBox message={error} />}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success"
            style={{
              width: "100%",
              padding: "0.875rem",
              fontSize: "1rem",
              marginTop: "var(--spacing-md)"
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--primary)",
                fontWeight: "600",
              }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

