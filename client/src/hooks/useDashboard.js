import { useEffect, useState } from "react";

import { getDashboard } from "../services/dashboard.service";

function useDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await getDashboard();

      setDashboard(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    dashboard,
    loading,
    loadDashboard,
  };
}

export default useDashboard;
