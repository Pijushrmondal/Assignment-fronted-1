import { useEffect, useState } from "react";
import { getPlaylists, Playlist } from "../../api/playlists";
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
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
        Playlists
      </h2>

      <PlaylistForm onSuccess={handleSuccess} />

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search playlists..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          style={{
            border: "1px solid #ccc",
            padding: "0.5rem",
            width: "300px",
            borderRadius: "4px",
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

