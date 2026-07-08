import { useCallback, useEffect, useState } from "react";

import { getMyMemories } from "../services/memory.service";

export default function useMemories() {
  const [memories, setMemories] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadMemories = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getMyMemories();

      setMemories(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  return {
    memories,
    loading,
    refresh: loadMemories,
  };
}
