import { useEffect, useState } from "react";
import { getPlaylists } from "../../api/playlists";
import type { Playlist } from "../../api/playlists";
import PlaylistForm from "../../components/playlists/PlaylistForm";
import PlaylistList from "../../components/playlists/PlaylistList";
import Loader from "../../components/common/Loader";
import ErrorBox from "../../components/common/ErrorBox";
import Pagination from "../../components/common/Pagination";

export default function PlaylistsPage() {
  const [items, setItems] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getPlaylists({ search, page, limit });
      setItems(data.items);
      setTotal(data.total);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to fetch playlists"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page]);

  const handleSuccess = () => {
    fetchData();
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "var(--spacing-xl)"
      }}>
        <div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            color: "var(--text-primary)"
          }}>
            🎵 Playlists
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem"
          }}>
            Organize your media content
          </p>
        </div>
      </div>

      <PlaylistForm onSuccess={handleSuccess} />

      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        <input
          type="text"
          placeholder="🔍 Search playlists..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="input"
          style={{
            maxWidth: "400px",
            padding: "0.75rem 1rem",
            fontSize: "0.875rem"
          }}
        />
      </div>

      {error && <ErrorBox message={error} />}

      {loading ? (
        <Loader />
      ) : (
        <>
          <PlaylistList items={items} />

          <Pagination
            page={page}
            limit={limit}
            total={total}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}

