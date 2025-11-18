// /src/components/common/ErrorBox.tsx
interface Props {
  message: string;
}

export default function ErrorBox({ message }: Props) {
  if (!message) return null;

  return (
    <div
      style={{
        padding: "0.75rem",
        background: "#ffe5e5",
        border: "1px solid #ff9b9b",
        color: "#b30000",
        borderRadius: "4px",
        marginBottom: "1rem",
      }}
    >
      {message}
    </div>
  );
}
