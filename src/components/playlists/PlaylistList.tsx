import type { Playlist } from "../../api/playlists";

interface Props {
  items: Playlist[];
}

export default function PlaylistList({ items }: Props) {
  return (
    <div>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Playlists</h3>
      
      {items.length === 0 ? (
        <p style={{ color: "#666", padding: "1rem" }}>No playlists found</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {items.map((playlist) => (
            <div
              key={playlist._id}
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: "#f9f9f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                    {playlist.name}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#666" }}>
                    {playlist.itemCount} item{playlist.itemCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

