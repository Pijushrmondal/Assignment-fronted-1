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
    <div style={{ 
      display: "flex", 
      gap: "0.5rem", 
      marginTop: "var(--spacing-xl)", 
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      <button 
        disabled={page === 1} 
        onClick={() => handleChange(page - 1)}
        className="btn btn-primary"
        style={{
          opacity: page === 1 ? 0.5 : 1,
          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        ← Previous
      </button>

      <div style={{ 
        padding: "0.5rem 1rem",
        background: "var(--bg-secondary)",
        borderRadius: "var(--border-radius)",
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "var(--text-primary)",
        minWidth: "120px",
        textAlign: "center"
      }}>
        Page {page} of {totalPages}
      </div>

      <button 
        disabled={page === totalPages} 
        onClick={() => handleChange(page + 1)}
        className="btn btn-primary"
        style={{
          opacity: page === totalPages ? 0.5 : 1,
          cursor: page === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next →
      </button>
    </div>
  );
}
