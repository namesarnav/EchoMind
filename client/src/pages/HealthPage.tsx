import { useEffect, useState } from "react";
import axios from "axios";

const HealthPage = () => {
  const [health, setHealth] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8888/health")
      .then((res) => {
        // if your FastAPI endpoint returns {"status": "ok"}
        setHealth(res.data.status);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!health) return <div>Loading...</div>;

  return (
    <div>
      <h1>Health Status</h1>
      <p>{health}</p>
    </div>
  );
};

export default HealthPage;