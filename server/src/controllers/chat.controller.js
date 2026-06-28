import * as chatService from "../services/chat/chat.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const myConversations = AsyncHandler(async (req, res) => {
  const data = await chatService.myConversations(req.user._id);

  return sendResponse(res, 200, data);
});

export const getMessages = AsyncHandler(async (req, res) => {
  const data = await chatService.getMessages(req.params.id);

  return sendResponse(res, 200, data);
});

export const deleteMessage = AsyncHandler(async (req, res) => {
  await chatService.deleteMessage(req.params.id, req.user._id);

  return sendResponse(res, 200, null, "Message deleted");
});
