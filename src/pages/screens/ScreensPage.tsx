import { useEffect, useState } from "react";
import { getScreens, toggleScreenStatus, Screen } from "../../api/screens";
import ScreensTable from "../../components/screens/ScreensTable";
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

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
        Screens
      </h2>

      <input
        type="text"
        placeholder="Search screens..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{
          border: "1px solid #ccc",
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "300px",
          borderRadius: "4px",
        }}
      />

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
