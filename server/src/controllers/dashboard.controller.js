import * as dashboardService from "../services/dashboard/dashboard.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const ownerDashboard = AsyncHandler(async (req, res) => {
  const data = await dashboardService.ownerDashboard(req.user._id);

  return sendResponse(
    res,

    200,

    data,
  );
});
