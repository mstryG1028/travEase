import * as emergencyService from "../services/emergency/emergency.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const nearbyEmergency = AsyncHandler(async (req, res) => {
  const data = await emergencyService.nearbyEmergency();

  return sendResponse(
    res,

    200,

    data,
  );
});
