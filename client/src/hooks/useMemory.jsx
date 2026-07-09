import { useCallback, useEffect, useState } from "react";

import {
  getMemory,
  updateMemory,
  deleteMemory,
  addMedia,
  deleteMedia,
  updateCover,
} from "../services/memory.service";

export default function useMemory(memoryId) {
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMemory = useCallback(async () => {
    if (!memoryId) return;

    try {
      setLoading(true);

      const res = await getMemory(memoryId);

      setMemory(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [memoryId]);

  useEffect(() => {
    loadMemory();
  }, [loadMemory]);

  const editMemory = async (payload) => {
    const res = await updateMemory(memoryId, payload);

    setMemory(res.data.data);

    return res.data.data;
  };

  const uploadMedia = async (formData) => {
    const res = await addMedia(memoryId, formData);

    setMemory(res.data.data);

    return res.data.data;
  };

  const removeMedia = async (mediaId) => {
    const res = await deleteMedia(memoryId, mediaId);

    setMemory(res.data.data);

    return res.data.data;
  };

  const changeCover = async (mediaId) => {
    const res = await updateCover(memoryId, mediaId);

    setMemory(res.data.data);

    return res.data.data;
  };

  const removeMemory = async () => {
    await deleteMemory(memoryId);
  };

  return {
    memory,
    loading,
    refresh: loadMemory,
    editMemory,
    uploadMedia,
    removeMedia,
    changeCover,
    removeMemory,
  };
}
