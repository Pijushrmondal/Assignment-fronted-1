import { useEffect, useState } from "react";
import { getScreens, toggleScreenStatus } from "../../api/screens";
import type { Screen } from "../../api/screens";
import ScreensTable from "../../components/screens/ScreensTable";
import ScreenForm from "../../components/screens/ScreenForm";
import Loader from "../../components/common/Loader";
import ErrorBox from "../../components/common/ErrorBox";
import Pagination from "../../components/common/Pagination";

const ScreensPage = () => {
  const [items, setItems] = useState<Screen[]>([]);
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
      const data = await getScreens({ search, page, limit });
      setItems(data.items);
      setTotal(data.total);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch screens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page]);

  const handleToggle = async (id: string) => {
    const previous = [...items];

    // optimistic UI update
    setItems((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isActive: !s.isActive } : s))
    );

    try {
      await toggleScreenStatus(id);
      setError(""); // clear any previous errors
    } catch (err: any) {
      setError(err?.response?.data?.message || "Toggle failed — rolled back");
      setItems(previous); // rollback
    }
  };

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
            📺 Screens
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem"
          }}>
            Manage your display screens
          </p>
        </div>
      </div>

      <ScreenForm onSuccess={handleSuccess} />

      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        <input
          type="text"
          placeholder="🔍 Search screens..."
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
          <ScreensTable items={items} onToggle={handleToggle} />

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
};

export default ScreensPage;
