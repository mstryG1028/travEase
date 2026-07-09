import api from "../api/axios";

export const getMyMemories = () => api.get("/memories");

export const getBookingMemories = (bookingId) =>
  api.get(`/memories/booking/${bookingId}`);

export const getMemory = (memoryId) => api.get(`/memories/${memoryId}`);

export const createMemory = (bookingId, data) =>
  api.post(`/memories/${bookingId}`, data);

export const updateMemory = (memoryId, data) =>
  api.patch(`/memories/${memoryId}`, data);

export const deleteMemory = (memoryId) => api.delete(`/memories/${memoryId}`);

export const addMedia = (memoryId, data) =>
  api.post(`/memories/${memoryId}/media`, data);

export const deleteMemoryMedia = (memoryId, mediaId) =>
  api.delete(`/memories/${memoryId}/media/${mediaId}`);

export const deleteMedia = (memoryId, mediaId) =>
  api.delete(`/memories/${memoryId}/media/${mediaId}`);

export const updateCover = (memoryId, mediaId) =>
  api.patch(`/memories/${memoryId}/cover`, {
    mediaId,
  });
