import React, { useEffect, useState } from "react";
import { fetchModels } from "../utils/helpers";

interface ModelListProps {
  onSelectModel: (modelName: string) => void;
}

interface Model {
  name: string;
  tableName: string;
}

export default function ModelList({ onSelectModel }: ModelListProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const data = await fetchModels();
        setModels(data);
      } catch (err) {
        console.error("Error fetching models:", err);
        setError("Failed to load models.");
      } finally {
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="model-list" style={styles.container}>
      <h3 style={styles.heading}>Available Models</h3>
      <ul style={styles.list}>
        {models.map((model) => (
          <li
            key={model.name}
            style={styles.item}
            onClick={() => onSelectModel(model.name)}
          >
            📦 {model.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🎨 Basic CSS-in-JS (you can move this to CSS file if you want)
const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    width: "260px",
  },
  heading: {
    fontSize: "1.1rem",
    marginBottom: "10px",
    color: "#333",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    padding: "8px 12px",
    marginBottom: "6px",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};