import { useCallback, useEffect, useState } from "react";

import {
  getBookingMemories,
  createMemory as createMemoryService,
  deleteMemory as deleteMemoryService,
} from "../services/memory.service";

export default function useMemories(bookingId) {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMemories = useCallback(async () => {
    if (!bookingId) return;

    try {
      setLoading(true);

      const res = await getBookingMemories(bookingId);

      setMemories(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  const createMemory = async (formData) => {
    const res = await createMemoryService(bookingId, formData);

    setMemories((prev) => [res.data.data, ...prev]);

    return res.data.data;
  };

  const deleteMemory = async (memoryId) => {
    await deleteMemoryService(memoryId);

    setMemories((prev) => prev.filter((memory) => memory._id !== memoryId));
  };

  return {
    memories,
    loading,
    refresh: loadMemories,
    createMemory,
    deleteMemory,
  };
}
