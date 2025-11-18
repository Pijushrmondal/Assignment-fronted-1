import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "1rem 0",
          borderBottom: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 var(--spacing-xl)",
          }}
        >
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <div style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Dashboard
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link
                to="/screens"
                style={{
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--border-radius)",
                  transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                📺 Screens
              </Link>
              <Link
                to="/playlists"
                style={{
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--border-radius)",
                  transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                🎵 Playlists
              </Link>
            </div>
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem"
          }}>
            <div style={{
              padding: "0.5rem 1rem",
              background: "var(--bg-secondary)",
              borderRadius: "var(--border-radius)",
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
            }}>
              <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>
                {user?.email}
              </span>
              <span style={{ margin: "0 0.5rem", color: "var(--gray-400)" }}>•</span>
              <span style={{
                padding: "0.125rem 0.5rem",
                background: user?.role === "ADMIN" ? "var(--primary)" : "var(--info)",
                color: "white",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: "600",
                textTransform: "uppercase"
              }}>
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.875rem"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto",
        padding: "var(--spacing-xl)"
      }}>
        <Outlet />
      </div>
    </div>
  );
}

