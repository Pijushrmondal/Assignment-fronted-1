import type { Playlist } from "../../api/playlists";

interface Props {
  items: Playlist[];
}

export default function PlaylistList({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="card" style={{
        textAlign: "center",
        padding: "var(--spacing-2xl)",
        color: "var(--text-secondary)"
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>🎵</div>
        <p style={{ fontSize: "1rem", fontWeight: "500" }}>No playlists found</p>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
          Create your first playlist to get started
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "var(--spacing-lg)", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {items.map((playlist) => (
        <div
          key={playlist._id}
          className="card"
          style={{
            padding: "var(--spacing-lg)",
            transition: "all var(--transition-base)",
            cursor: "pointer",
            border: "1px solid var(--border-color)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "var(--shadow-xl)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--spacing-md)" }}>
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
                color: "var(--text-primary)"
              }}>
                {playlist.name}
              </h4>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                background: "var(--bg-secondary)",
                borderRadius: "var(--border-radius)",
                fontSize: "0.8125rem",
                fontWeight: "500",
                color: "var(--text-secondary)"
              }}>
                <span>📦</span>
                <span>
                  {playlist.itemCount} item{playlist.itemCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

