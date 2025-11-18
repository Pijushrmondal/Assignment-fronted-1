import { useState, FormEvent } from "react";
import { createScreen } from "../../api/screens";
import type { CreateScreenRequest } from "../../api/screens";
import ErrorBox from "../common/ErrorBox";

interface Props {
  onSuccess: () => void;
}

export default function ScreenForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Screen name is required");
      return;
    }

    const payload: CreateScreenRequest = {
      name: name.trim(),
      isActive,
    };

    setLoading(true);
    try {
      await createScreen(payload);
      setName("");
      setIsActive(true);
      onSuccess();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to create screen"
      );
    } finally {
      setLoading(false);
    }
  };

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
        ➕ Create New Screen
      </h3>

      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        <label className="label">
          Screen Name <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
          placeholder="Enter screen name"
        />
      </div>

      <div style={{
        marginBottom: "var(--spacing-lg)",
        padding: "var(--spacing-md)",
        background: "var(--bg-secondary)",
        borderRadius: "var(--border-radius)"
      }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}
        >
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            style={{
              cursor: "pointer",
              width: "18px",
              height: "18px",
              accentColor: "var(--primary)"
            }}
          />
          <span>Active by default</span>
        </label>
      </div>

      {error && <ErrorBox message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-success"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "0.875rem"
        }}
      >
        {loading ? "Creating..." : "Create Screen"}
      </button>
    </form>
  );
}

