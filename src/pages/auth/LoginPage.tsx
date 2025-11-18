import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import ErrorBox from "../../components/common/ErrorBox";

export default function LoginPage() {
  const { token, login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setLoading(true);

    try {
      const response = await login({ email, password });
      setAuth(response.token, {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role,
      });
      navigate("/screens");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
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
            Welcome Back
          </h1>
          <p style={{ 
            color: "var(--text-secondary)",
            fontSize: "0.875rem"
          }}>
            Sign in to your account to continue
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
              placeholder="admin@example.com"
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
              className="input"
              placeholder="Enter your password"
            />
          </div>

          {error && <ErrorBox message={error} />}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "0.875rem",
              fontSize: "1rem",
              marginTop: "var(--spacing-md)"
            }}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div style={{ 
          marginTop: "var(--spacing-xl)", 
          padding: "var(--spacing-lg)", 
          background: "var(--bg-secondary)", 
          borderRadius: "var(--border-radius)",
          border: "1px solid var(--border-color)"
        }}>
          <p style={{ 
            marginBottom: "var(--spacing-md)", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "0.875rem"
          }}>
            🧪 Test Credentials
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ 
              display: "flex", 
              gap: "0.75rem", 
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@example.com");
                  setPassword("admin123");
                }}
                className="btn btn-success"
                style={{
                  padding: "0.5rem 0.875rem",
                  fontSize: "0.8125rem",
                }}
              >
                Fill Admin
              </button>
              <span style={{ 
                fontSize: "0.8125rem", 
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)"
              }}>
                admin@example.com / admin123
              </span>
            </div>
            <div style={{ 
              display: "flex", 
              gap: "0.75rem", 
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <button
                type="button"
                onClick={() => {
                  setEmail("editor@example.com");
                  setPassword("editor123");
                }}
                className="btn"
                style={{
                  padding: "0.5rem 0.875rem",
                  fontSize: "0.8125rem",
                  background: "var(--info)",
                  color: "white"
                }}
              >
                Fill Editor
              </button>
              <span style={{ 
                fontSize: "0.8125rem", 
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)"
              }}>
                editor@example.com / editor123
              </span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "var(--primary)",
                fontWeight: "600",
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

