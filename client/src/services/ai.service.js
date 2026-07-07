import api from "../api/axios";

export async function askAI(listingId, question) {
  const { data } = await api.post("/ai/chat", {
    listingId,
    question,
  });

  return data.data;
}
