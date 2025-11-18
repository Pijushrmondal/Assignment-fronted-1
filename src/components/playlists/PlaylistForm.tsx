import { useState, FormEvent } from "react";
import { createPlaylist } from "../../api/playlists";
import type { CreatePlaylistRequest } from "../../api/playlists";
import ErrorBox from "../common/ErrorBox";

interface Props {
  onSuccess: () => void;
}

export default function PlaylistForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [urlsText, setUrlsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Parse URLs from textarea (one per line, max 10)
    const urlLines = urlsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (urlLines.length > 10) {
      setError("Maximum 10 URLs allowed");
      return;
    }

    // Validate URLs
    const urlPattern = /^https?:\/\/.+/;
    const invalidUrls = urlLines.filter((url) => !urlPattern.test(url));
    if (invalidUrls.length > 0) {
      setError(`Invalid URLs: ${invalidUrls.join(", ")}`);
      return;
    }

    const payload: CreatePlaylistRequest = {
      name: name.trim(),
      itemUrls: urlLines.length > 0 ? urlLines : undefined,
    };

    setLoading(true);
    try {
      await createPlaylist(payload);
      setName("");
      setUrlsText("");
      onSuccess();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to create playlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Create Playlist</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
          Name <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Enter playlist name"
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
          URLs (one per line, max 10)
        </label>
        <textarea
          value={urlsText}
          onChange={(e) => setUrlsText(e.target.value)}
          rows={5}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
          placeholder="https://example.com/video1.mp4&#10;https://example.com/image1.jpg"
        />
        <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.25rem" }}>
          {urlsText.split("\n").filter((l) => l.trim()).length} / 10 URLs
        </div>
      </div>

      {error && <ErrorBox message={error} />}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Creating..." : "Create Playlist"}
      </button>
    </form>
  );
}

