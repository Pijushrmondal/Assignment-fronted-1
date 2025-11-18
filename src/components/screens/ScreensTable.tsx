import type { Screen } from "../../api/screens";

interface Props {
  items: Screen[];
  onToggle: (id: string) => void;
}

export default function ScreensTable({ items, onToggle }: Props) {
  if (items.length === 0) {
    return (
      <div className="card" style={{
        textAlign: "center",
        padding: "var(--spacing-2xl)",
        color: "var(--text-secondary)"
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>📺</div>
        <p style={{ fontSize: "1rem", fontWeight: "500" }}>No screens found</p>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
          Create your first screen to get started
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        overflowX: "auto"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>
          <thead>
            <tr style={{
              background: "var(--bg-secondary)",
              borderBottom: "2px solid var(--border-color)"
            }}>
              <th style={{
                padding: "1rem",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Screen Name
              </th>
              <th style={{
                padding: "1rem",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Status
              </th>
              <th style={{
                padding: "1rem",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((screen, index) => (
              <tr
                key={screen._id}
                style={{
                  borderBottom: index < items.length - 1 ? "1px solid var(--border-color)" : "none",
                  transition: "background-color var(--transition-fast)",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td style={{
                  padding: "1rem",
                  fontWeight: "500",
                  color: "var(--text-primary)"
                }}>
                  {screen.name}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.375rem 0.75rem",
                      borderRadius: "var(--border-radius)",
                      fontSize: "0.8125rem",
                      fontWeight: "600",
                      background: screen.isActive
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      color: screen.isActive
                        ? "var(--success-dark)"
                        : "var(--danger-dark)",
                    }}
                  >
                    <span style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: screen.isActive ? "var(--success)" : "var(--danger)"
                    }} />
                    {screen.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    onClick={() => onToggle(screen._id)}
                    className="btn btn-primary"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem"
                    }}
                    aria-label={`Toggle ${screen.name} status`}
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

