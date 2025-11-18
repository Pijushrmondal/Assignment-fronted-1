// /src/components/common/ErrorBox.tsx
interface Props {
  message: string;
}

export default function ErrorBox({ message }: Props) {
  if (!message) return null;

  return (
    <div
      style={{
        padding: "0.875rem 1rem",
        background: "#fef2f2",
        border: "1.5px solid #fecaca",
        color: "#dc2626",
        borderRadius: "var(--border-radius)",
        marginBottom: "var(--spacing-md)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          d="M10 6v4M10 14h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>{message}</span>
    </div>
  );
}
