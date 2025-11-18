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

  const urlCount = urlsText.split("\n").filter((l) => l.trim()).length;

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        marginBottom: "var(--spacing-xl)",
        background: "var(--bg-primary)"
      }}
    >
      <h3 style={{
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "var(--spacing-lg)",
        color: "var(--text-primary)"
      }}>
        ➕ Create New Playlist
      </h3>

      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        <label className="label">
          Playlist Name <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
          placeholder="Enter playlist name"
        />
      </div>

      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        <label className="label">
          URLs (one per line, max 10)
        </label>
        <textarea
          value={urlsText}
          onChange={(e) => setUrlsText(e.target.value)}
          rows={6}
          className="input"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            resize: "vertical",
            minHeight: "120px"
          }}
          placeholder="https://example.com/video1.mp4&#10;https://example.com/image1.jpg"
        />
        <div style={{
          fontSize: "0.8125rem",
          color: urlCount > 10 ? "var(--danger)" : "var(--text-secondary)",
          marginTop: "0.5rem",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <span style={{
            padding: "0.25rem 0.5rem",
            background: urlCount > 10 ? "rgba(239, 68, 68, 0.1)" : "var(--bg-secondary)",
            borderRadius: "4px",
            color: urlCount > 10 ? "var(--danger-dark)" : "var(--text-primary)",
            fontWeight: "600"
          }}>
            {urlCount} / 10 URLs
          </span>
          {urlCount > 10 && (
            <span style={{ color: "var(--danger)" }}>
              ⚠️ Maximum 10 URLs allowed
            </span>
          )}
        </div>
      </div>

      {error && <ErrorBox message={error} />}

      <button
        type="submit"
        disabled={loading || urlCount > 10}
        className="btn btn-primary"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "0.875rem"
        }}
      >
        {loading ? "Creating..." : "Create Playlist"}
      </button>
    </form>
  );
}

