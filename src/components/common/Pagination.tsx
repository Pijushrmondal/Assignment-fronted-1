// /src/components/common/Pagination.tsx

interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (p: number) => void;
  onPageChange?: (p: number) => void; // alias for onChange
}

export default function Pagination({ 
  page, 
  total, 
  limit, 
  onChange,
  onPageChange 
}: Props) {
  const totalPages = Math.ceil(total / limit);
  const handleChange = onPageChange || onChange;
  
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "1rem", alignItems: "center" }}>
      <button 
        disabled={page === 1} 
        onClick={() => handleChange(page - 1)}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          background: page === 1 ? "#f5f5f5" : "white",
          cursor: page === 1 ? "not-allowed" : "pointer",
          borderRadius: "4px",
        }}
      >
        Prev
      </button>

      <span style={{ padding: "0 1rem" }}>
        Page {page} of {totalPages}
      </span>

      <button 
        disabled={page === totalPages} 
        onClick={() => handleChange(page + 1)}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          background: page === totalPages ? "#f5f5f5" : "white",
          cursor: page === totalPages ? "not-allowed" : "pointer",
          borderRadius: "4px",
        }}
      >
        Next
      </button>
    </div>
  );
}
